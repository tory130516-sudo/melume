const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbysQd6Kbe7MrrBxxK8tv0TGVIjcj5cP9s9DCU7YDRZ1j_Fj-OO0xbXIVJ1FArQ6OXU4Ng/exec";

const form = document.querySelector("#lead-form");
const successCard = document.querySelector("#success-card");
const formError = document.querySelector("#form-error");
const submitButton = document.querySelector("#submit-button");
const submitLabel = document.querySelector("#submit-label");
const sendAnotherButton = document.querySelector("#send-another");
const otherFormatInput = document.querySelector("#other-format");
const formatInputs = [...document.querySelectorAll('input[name="workFormat"]')];

function selectedFormats() {
  return formatInputs.filter((input) => input.checked).map((input) => input.value);
}

function updateFormatState() {
  formatInputs.forEach((input) => {
    input.closest(".check-card").classList.toggle("is-selected", input.checked);
  });

  const hasOther = selectedFormats().includes("Інше");
  otherFormatInput.hidden = !hasOther;
  otherFormatInput.required = hasOther;

  if (!hasOther) {
    otherFormatInput.value = "";
  }
}

function showError(message) {
  formError.textContent = message;
  formError.hidden = false;
}

function clearError() {
  formError.textContent = "";
  formError.hidden = true;
}

formatInputs.forEach((input) => input.addEventListener("change", updateFormatState));

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearError();

  const workFormats = selectedFormats();

  if (workFormats.length === 0) {
    showError("Оберіть хоча б один формат роботи.");
    return;
  }

  const data = new FormData(form);
  const payload = {
    name: String(data.get("name") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    specialization: String(data.get("specialization") || "").trim(),
    experience: String(data.get("experience") || "").trim(),
    workFormats,
    otherFormat: String(data.get("otherFormat") || "").trim(),
    brands: String(data.get("brands") || "").trim(),
    socialUrl: String(data.get("socialUrl") || "").trim(),
  };

  submitButton.disabled = true;
  submitLabel.textContent = "Надсилаємо…";

  try {
    await fetch(FORM_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    form.reset();
    updateFormatState();
    form.hidden = true;
    successCard.hidden = false;

    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }
  } catch (error) {
    showError("Не вдалося надіслати заявку. Спробуйте ще раз за хвилину.");
  } finally {
    submitButton.disabled = false;
    submitLabel.textContent = "Надіслати заявку";
  }
});

sendAnotherButton.addEventListener("click", () => {
  successCard.hidden = true;
  form.hidden = false;
  form.querySelector("input").focus();
});

updateFormatState();
