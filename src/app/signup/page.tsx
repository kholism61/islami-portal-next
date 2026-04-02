import Script from "next/script";
import Image from "next/image";

export const metadata = {
  title: "Sign Up | Portal Literasi Islam",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function SignUpPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/css/auth.css" />

      <main className="auth-page">
        <header className="auth-topbar">
          <a href="/" className="brand-link">
            <span className="brand-badge" aria-hidden="true">
              <Image src="/favicon.ico" alt="" width={24} height={24} priority />
            </span>
            <span className="brand-text">
              <strong>Portal Literasi Islam</strong>
              <small>Daftar akun portal untuk pembaca, editor, dan admin</small>
            </span>
          </a>

          <div className="auth-topbar-actions">
            <nav>
              <a href="/">Beranda</a>
              <a href="/signin">Sign In</a>
              <a href="/portal-admin">Admin</a>
            </nav>

            <div className="lang-dropdown auth-lang-dropdown" id="langDropdown">
              <button id="langBtn" className="lang-btn" type="button">
                🌐
              </button>
              <div className="lang-menu">
                <button
                  type="button"
                  data-set-lang="id"
                >
                  🇮🇩 Indonesia
                </button>
                <button
                  type="button"
                  data-set-lang="en"
                >
                  🇬🇧 English
                </button>
                <button
                  type="button"
                  data-set-lang="ar"
                >
                  🇸🇦 العربية
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className="auth-shell">
          <aside className="auth-side">
            <span className="eyebrow">Portal Membership</span>
            <h1>
              Bangun akun <span>portal modern</span> untuk dakwah literasi.
            </h1>
            <p>
              Form Sign Up ini dibuat ringan dan profesional agar onboarding
              pembaca serta tim portal berjalan lebih cepat dan nyaman.
            </p>

            <ul className="feature-list">
              <li>Akun member cocok untuk pembaca, relawan, dan kontributor.</li>
              <li>Email admin akan otomatis mendapat akses dashboard admin.</li>
              <li>Session tetap sinkron dengan struktur localStorage yang lama.</li>
            </ul>

            <div className="auth-meta">
              <div className="default-card">
                <strong>Email admin yang dikenali</strong>
                <p>nurcholism51@gmail.com</p>
              </div>
              <div className="default-card">
                <strong>Saran penggunaan</strong>
                <p>
                  Pakai akun admin untuk pengelolaan, akun member untuk uji
                  portal pengguna.
                </p>
              </div>
            </div>
          </aside>

          <section className="auth-card">
            <h2>Sign Up</h2>
            <p className="auth-subtext">
              Buat akun baru dan sistem akan langsung menyiapkan session portal
              Anda.
            </p>

            <form id="signupForm" className="auth-form">
              <div className="field-row">
                <label className="field-label" htmlFor="signupName">
                  Nama Lengkap
                </label>
                <input
                  id="signupName"
                  name="name"
                  type="text"
                  className="input-field"
                  placeholder="Nama Anda"
                  required
                />
              </div>

              <div className="field-row">
                <label className="field-label" htmlFor="signupEmail">
                  Email
                </label>
                <input
                  id="signupEmail"
                  name="email"
                  type="email"
                  className="input-field"
                  placeholder="nama@domain.com"
                  required
                />
              </div>

              <div className="form-split">
                <div className="field-row">
                  <label className="field-label" htmlFor="signupPassword">
                    Password
                  </label>
                  <input
                    id="signupPassword"
                    name="password"
                    type="password"
                    className="input-field"
                    placeholder="Minimal 6 karakter"
                    required
                  />
                </div>

                <div className="field-row">
                  <label
                    className="field-label"
                    htmlFor="signupConfirmPassword"
                  >
                    Konfirmasi Password
                  </label>
                  <input
                    id="signupConfirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="input-field"
                    placeholder="Ulangi password"
                    required
                  />
                </div>
              </div>

              <p className="form-note">
                Role akun akan otomatis menjadi <b>admin</b> jika email termasuk
                daftar admin portal, selain itu menjadi <b>member</b>.
              </p>

              <div
                id="signupMessage"
                className="auth-message"
                aria-live="polite"
              ></div>

              <button type="submit" className="submit-btn">
                Buat akun sekarang
              </button>
              <a href="/signin" className="alt-btn">
                Sudah punya akun? Sign In
              </a>
            </form>

            <div className="auth-footer">
              <p>
                Setelah pendaftaran berhasil, Anda akan langsung diarahkan ke
                halaman yang sesuai dengan role akun.
              </p>
              <a
                href="/signin"
                className="inline-link footer-link"
                id="signupExistingAccountLink"
              >
                Masuk ke akun yang sudah ada
              </a>
            </div>
          </section>
        </section>
      </main>

      <Script src="/js/auth.js?v=20260317b" strategy="afterInteractive" />
      <Script src="/js/i18n.js?v=20260317b" strategy="afterInteractive" />
      <Script src="/js/admin-pages-i18n.js?v=20260317b" strategy="afterInteractive" />

      <Script id="signup-inline-script" strategy="afterInteractive">
        {`
          (function () {
            function waitForAuth(ready, attemptsLeft) {
              if (
                window.PortalAuth &&
                typeof window.PortalAuth.getCurrentUser === "function" &&
                window.PortalI18n &&
                typeof window.PortalI18n.t === "function"
              ) {
                ready();
                return;
              }
              if ((attemptsLeft || 0) <= 0) return;
              window.setTimeout(() => waitForAuth(ready, (attemptsLeft || 0) - 1), 60);
            }

            function applySignupLocale() {
              const i18n = window.PortalI18n;
              if (!i18n || typeof i18n.t !== "function") return;
              const link = document.getElementById("signupExistingAccountLink");
              if (link) link.textContent = i18n.t("footer_link");
            }

            function init() {
              const form = document.getElementById("signupForm");
              const message = document.getElementById("signupMessage");
              if (!form || !message) return;

              const params = new URLSearchParams(window.location.search);
              const next = params.get("next") || "";
              const signinLinks = document.querySelectorAll('a[href="/signin"]');
              const existingUser = window.PortalAuth.getCurrentUser();

              signinLinks.forEach((link) => {
                if (next) {
                  link.href = "/signin?next=" + encodeURIComponent(next);
                }
              });

              function setMessage(text, type) {
                message.textContent = text;
                message.className = ("auth-message " + (type || "")).trim();
              }

              if (existingUser) {
                setMessage(window.PortalI18n.t("session_active", { email: existingUser.email }), "success");
              }

              applySignupLocale();

              form.addEventListener("submit", (event) => {
                event.preventDefault();
                const formData = new FormData(form);

                (async () => {
                  try {
                    const result = await window.PortalAuth.signup({
                      name: formData.get("name"),
                      email: formData.get("email"),
                      password: formData.get("password"),
                      confirmPassword: formData.get("confirmPassword"),
                      next
                    });

                    const roleLabel =
                      result.user.role === "admin"
                        ? window.PortalI18n.t("role_admin")
                        : window.PortalI18n.t("role_member");

                    setMessage(window.PortalI18n.t("signup_success", { role: roleLabel }), "success");
                    window.setTimeout(() => {
                      window.location.href = result.redirectTo;
                    }, 350);
                  } catch (error) {
                    setMessage(window.PortalI18n.translateAuthError(error.message), "error");
                  }
                })();
              });
            }

            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", () => waitForAuth(init, 60));
            } else {
              waitForAuth(init, 60);
            }

            window.addEventListener("portal-language-change", applySignupLocale);
            window.addEventListener("storage", (event) => {
              if (event.key === "siteLang") applySignupLocale();
            });

            waitForAuth(init, 200);
          })();
        `}
      </Script>
    </>
  );
}