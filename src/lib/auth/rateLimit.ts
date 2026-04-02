type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

export function rateLimitOrThrow(key: string, options?: { limit?: number; windowMs?: number }) {
  const limit = options?.limit ?? 10;
  const windowMs = options?.windowMs ?? 60_000;

  const t = now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= t) {
    buckets.set(key, { count: 1, resetAt: t + windowMs });
    return;
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    const err = new Error("Too many requests");
    (err as any).status = 429;
    (err as any).retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - t) / 1000));
    throw err;
  }
}
