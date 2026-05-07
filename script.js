const form = document.getElementById("feedbackForm");
const summary = document.getElementById("form-summary");

const fields = form?.querySelectorAll("input, select") ?? [];
const errorEls = form?.querySelectorAll(".error-msg") ?? [];

function showError(fieldEl, errorEl, message) {
  const hintId = `${fieldEl.id}-hint`;

  fieldEl.setAttribute("aria-invalid", "true");
  fieldEl.setAttribute("aria-describedby", `${hintId} ${errorEl.id}`);

  errorEl.textContent = message;
  errorEl.hidden = false;
}

function clearError(fieldEl, errorEl) {
  const hintId = `${fieldEl.id}-hint`;

  fieldEl.setAttribute("aria-invalid", "false");
  fieldEl.setAttribute("aria-describedby", hintId);

  errorEl.hidden = true;
  errorEl.textContent = "";
}

function getErrorEl(fieldEl) {
  return document.getElementById(`${fieldEl.id}-error`);
}

function validateField(fieldEl) {
  const value = (fieldEl.value ?? "").trim();

  if (fieldEl.id === "name") {
    if (value.length === 0) return "Введіть ім’я.";
    if (value.length < 2) return "Ім’я має містити щонайменше 2 символи.";
    return "";
  }

  if (fieldEl.id === "email") {
    if (value.length === 0) return "Введіть електронну адресу.";
    if (fieldEl.validity?.typeMismatch) return "Введіть коректну електронну адресу (наприклад: student@knu.ua).";
    return "";
  }

  if (fieldEl.id === "password") {
    if (value.length === 0) return "Введіть пароль.";
    if (value.length < 8) return "Пароль має містити щонайменше 8 символів.";
    if (!/\d/.test(value)) return "Пароль має містити хоча б одну цифру.";
    return "";
  }

  if (fieldEl.id === "topic") {
    if (value === "") return "Оберіть тему звернення зі списку.";
    return "";
  }

  return "";
}

function clearAllErrors() {
  for (const errorEl of errorEls) {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  for (const fieldEl of fields) {
    const hintId = `${fieldEl.id}-hint`;
    fieldEl.setAttribute("aria-invalid", "false");
    fieldEl.setAttribute("aria-describedby", hintId);
  }
}

for (const fieldEl of fields) {
  fieldEl.addEventListener("blur", () => {
    const errorEl = getErrorEl(fieldEl);
    if (!errorEl) return;

    const errorMessage = validateField(fieldEl);
    if (errorMessage) {
      showError(fieldEl, errorEl, errorMessage);
    } else {
      clearError(fieldEl, errorEl);
    }
  });
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!summary) return;

  summary.textContent = "";

  const messages = [];
  for (const fieldEl of fields) {
    const errorEl = getErrorEl(fieldEl);
    if (!errorEl) continue;

    const errorMessage = validateField(fieldEl);
    if (errorMessage) {
      showError(fieldEl, errorEl, errorMessage);
      messages.push(errorMessage);
    } else {
      clearError(fieldEl, errorEl);
    }
  }

  if (messages.length > 0) {
    summary.textContent = `Виправте помилки (${messages.length}): ${messages.join(" ")}`;
    summary.focus();
    return;
  }

  summary.textContent = "Форму успішно надіслано!";
  form.reset();
  clearAllErrors();
  summary.focus();
});
