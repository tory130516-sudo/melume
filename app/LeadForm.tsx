"use client";

import { FormEvent, useState } from "react";

const workFormats = [
  "Клініка",
  "Приватна практика",
  "Власний кабінет",
  "Салон краси",
  "Інше",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function toggleFormat(format: string) {
    setSelectedFormats((current) =>
      current.includes(format)
        ? current.filter((item) => item !== format)
        : [...current, format],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (selectedFormats.length === 0) {
      setStatus("error");
      setErrorMessage("Оберіть хоча б один формат роботи.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      specialization: String(formData.get("specialization") ?? "").trim(),
      experience: String(formData.get("experience") ?? "").trim(),
      workFormats: selectedFormats,
      otherFormat: String(formData.get("otherFormat") ?? "").trim(),
      brands: String(formData.get("brands") ?? "").trim(),
      socialUrl: String(formData.get("socialUrl") ?? "").trim(),
    };

    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      form.reset();
      setSelectedFormats([]);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Не вдалося надіслати заявку. Спробуйте ще раз за хвилину.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="success-card" role="status" aria-live="polite">
        <span className="success-mark" aria-hidden="true">✓</span>
        <p className="eyebrow eyebrow-light">Заявку надіслано</p>
        <h3>Дякуємо за ваш інтерес до Melumé.</h3>
        <p>
          Ми вже отримали інформацію про вашу практику. Команда зв’яжеться з
          вами, щоб обговорити наступні кроки.
        </p>
        <button
          type="button"
          className="text-button"
          onClick={() => setStatus("idle")}
        >
          Надіслати ще одну заявку →
        </button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="question">
        <div className="question-heading">
          <label htmlFor="specialization">Яка ваша спеціалізація?</label>
        </div>
        <input
          id="specialization"
          name="specialization"
          type="text"
          placeholder="Наприклад: лікар-дерматолог, косметолог"
          autoComplete="organization-title"
          required
        />
      </div>

      <div className="question">
        <div className="question-heading">
          <label htmlFor="experience">Який у вас досвід роботи?</label>
        </div>
        <input
          id="experience"
          name="experience"
          type="text"
          placeholder="Вкажіть кількість років або коротко опишіть досвід"
          required
        />
      </div>

      <fieldset className="question">
        <legend className="question-heading">
          <span>У якому форматі ви працюєте?</span>
        </legend>
        <div className="format-grid">
          {workFormats.map((format) => (
            <label
              className={`check-card ${
                selectedFormats.includes(format) ? "is-selected" : ""
              }`}
              key={format}
            >
              <input
                type="checkbox"
                name="workFormat"
                value={format}
                checked={selectedFormats.includes(format)}
                onChange={() => toggleFormat(format)}
              />
              <span className="custom-check" aria-hidden="true" />
              <span>{format}</span>
            </label>
          ))}
        </div>
        {selectedFormats.includes("Інше") && (
          <input
            className="other-input"
            name="otherFormat"
            type="text"
            placeholder="Вкажіть ваш формат"
            required
          />
        )}
      </fieldset>

      <div className="question">
        <div className="question-heading">
          <label htmlFor="brands">
            Які бренди професійного домашнього догляду вже представлені у вашій
            практиці?
          </label>
        </div>
        <textarea
          id="brands"
          name="brands"
          rows={3}
          placeholder="Перелічіть деякі бренди, з якими працюєте"
          required
        />
      </div>

      <div className="question">
        <div className="question-heading">
          <label htmlFor="socialUrl">
            Посилання на вашу професійну сторінку в соціальних мережах
          </label>
        </div>
        <input
          id="socialUrl"
          name="socialUrl"
          type="url"
          placeholder="https://instagram.com/..."
          inputMode="url"
          autoComplete="url"
        />
        <small>За наявності</small>
      </div>

      {status === "error" && (
        <p className="form-error" role="alert">{errorMessage}</p>
      )}

      <div className="submit-row">
        <p>
          Надсилаючи форму, ви погоджуєтеся на обробку наданих даних для
          розгляду заявки.
        </p>
        <button type="submit" disabled={status === "submitting"}>
          <span>
            {status === "submitting" ? "Надсилаємо…" : "Надіслати заявку"}
          </span>
          <span className="submit-icon" aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
