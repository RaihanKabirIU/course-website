function sanitizeInput(value) {
  const pattern = /(<[^>]*>|https?:\/\/[^\s]+|script|on\w+=|data:|javascript:)/gi;
  return pattern.test(value);
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;

  // ✅ reCAPTCHA Validation
  const recaptcha = grecaptcha.getResponse();
  if (!recaptcha) {
    alert("❌ Please verify you're not a robot.");
    return;
  }

  const name = form.querySelector('[name="Name"]').value.trim();
  const email = form.querySelector('[name="Email"]').value.trim();
  const whatsapp = form.querySelector('[name="WhatsApp"]').value.trim();
  const message = form.querySelector('[name="Message"]').value.trim();

  // ✅ Input Validations
  if (sanitizeInput(name) || name.length < 2) {
    alert("❌ Invalid Name. Please enter a valid name.");
    return;
  }

  if (sanitizeInput(email)) {
    alert("❌ Invalid Email. Please enter a valid email.");
    return;
  }

  if (whatsapp && !/^\d{6,15}$/.test(whatsapp)) {
    alert("❌ Invalid WhatsApp Number. Only digits are allowed (6-15 digits).");
    return;
  }

  if (sanitizeInput(message) || message.length < 5) {
    alert("❌ Invalid Message. Avoid links, scripts, or tags.");
    return;
  }

  // ✅ Submit via Netlify
  const data = new FormData(form);
  fetch("/", {
    method: "POST",
    body: data,
  })
    .then(() => {
      form.style.display = "none";
      document.getElementById("thank-you").style.display = "block";
      grecaptcha.reset(); // Reset reCAPTCHA
    })
    .catch((error) => alert("❌ Error: " + error));
}
