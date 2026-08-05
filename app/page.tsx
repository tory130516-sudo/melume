import { LeadForm } from "./LeadForm";

export default function Home() {
  return (
    <main>
      <section className="story" aria-labelledby="story-title">
        <nav className="nav" aria-label="Головна навігація">
          <a
            href="#top"
            className="logo-link"
            aria-label="Melumé Skinscience — на початок"
          >
            <img className="logo" src="/logo-black.png" alt="Melumé Skinscience" />
          </a>
          <div className="nav-links">
            <a href="#about">Про нас</a>
            <a className="nav-cta" href="#application">
              Стати партнером
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>

        <div className="story-layout" id="top">
          <figure className="hero-visual">
            <img
              src="/hero-products-clean.png"
              alt="Лінійка професійного догляду Melumé Skinscience"
            />
          </figure>
          <p className="eyebrow">Melumé professional partnership</p>
          <div className="hero-title-row">
            <h1 id="story-title">
              Станьте партнером
              <span className="brand-name">Melumé Skinscience</span>
            </h1>
            <p className="hero-subtitle">
              Сучасний німецький бренд для професійної співпраці
            </p>
          </div>

          <div className="story-content-grid">
            <p className="story-lead">
              Запрошуємо косметологів, лікарів, естетистів та власників
              спеціалізованих магазинів до професійної співпраці.
            </p>
            <div className="story-action">
              <a className="primary-cta" href="#application">
                Подати заявку
                <span className="button-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="partner-offer" aria-label="Що отримують партнери Melumé">
            <article>
              <p>Вигідні умови співпраці</p>
            </article>
            <article>
              <p>Навчання для команди</p>
            </article>
            <article>
              <p>Маркетингові матеріали та постійна підтримка</p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="application"
        id="application"
        aria-labelledby="application-title"
      >
        <div className="application-side">
          <div className="application-intro">
            <p className="eyebrow eyebrow-light">Заявка на партнерство</p>
            <h2 id="application-title">
              Давайте працювати <em>разом</em>
            </h2>
            <p>
              Розкажіть трохи про вашу практику. Ми розглянемо заявку та
              зв’яжемося, щоб особисто обговорити формат і умови співпраці.
            </p>
            <div className="application-aside">
              <span>5 коротких питань</span>
              <span>≈ 2 хвилини</span>
            </div>
          </div>

          <figure className="application-visual">
            <img
              src="/form-products-black.png"
              alt="Зволожувальні сироватки Melumé Skinscience"
            />
          </figure>
        </div>

        <LeadForm />
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about-heading">
          <p className="eyebrow">Про нас</p>
          <h2 id="about-title">Чому косметологи обирають Melumé Skinscience?</h2>
        </div>

        <div className="about-copy">
          <p className="about-lead">
            Melumé Skinscience — професійний бренд домашнього догляду зі
            створеними в Німеччині формулами, який допомагає підтримувати та
            пролонгувати результати косметологічних процедур.
          </p>
          <p>
            Ми створюємо засоби з активними компонентами у робочих
            концентраціях, поєднуючи їх із комфортними текстурами, щоб пацієнти
            із задоволенням користувалися доглядом щодня та дотримувалися
            рекомендацій косметолога.
          </p>
          <p>
            Лінійка Melumé Skinscience допомагає працювати з найпоширенішими
            запитами пацієнтів: відновлення бар’єрної функції, зволоження,
            висипання, пігментація, вікові зміни, чутливість шкіри та інші.
          </p>
          <p>
            Ми прагнемо бути надійним партнером для косметологів, надаючи
            професійний домашній догляд, який доповнює вашу експертизу та
            допомагає пацієнтам зберігати результат між процедурами.
          </p>
        </div>

        <div className="about-footer">
          <img src="/logo-black.png" alt="Melumé Skinscience" />
          <a
            className="privacy-link"
            href="https://melume-skinscience.com.ua/pages/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >
            Політика конфіденційності
          </a>
          <a className="footer-cta" href="#application">
            Стати партнером
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
