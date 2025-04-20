function sanitizeInput(value) {
    // XSS, HTML Tag, Script, URL, Inline JS block
    const pattern = /(<[^>]*>|https?:\/\/[^\s]+|script|on\w+=|data:|javascript:)/gi;
    return pattern.test(value);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
  
    const form = event.target;
    const name = form.querySelector('[name="Name"]').value.trim();
    const email = form.querySelector('[name="Email"]').value.trim();
    const whatsapp = form.querySelector('[name="WhatsApp"]').value.trim();
    const message = form.querySelector('[name="Message"]').value.trim();
  
    // Validate Name
    if (sanitizeInput(name) || name.length < 2) {
      alert("❌ Invalid Name. Please enter a valid name.");
      return;
    }
  
    // Validate Email
    if (sanitizeInput(email)) {
      alert("❌ Invalid Email. Please enter a valid email.");
      return;
    }
  
    // Validate WhatsApp: only numbers, 6-15 digits
    if (whatsapp && !/^\d{6,15}$/.test(whatsapp)) {
      alert("❌ Invalid WhatsApp Number. Only digits are allowed (6-15 digits).");
      return;
    }
  
    // Validate Message
    if (sanitizeInput(message) || message.length < 5) {
      alert("❌ Invalid Message. Avoid links, scripts, or tags.");
      return;
    }
  
    // Submit form via Netlify
    const data = new FormData(form);
    fetch("/", {
      method: "POST",
      body: data,
    })
      .then(() => {
        form.style.display = "none";
        document.getElementById("thank-you").style.display = "block";
      })
      .catch((error) => alert("Error: " + error));
  }
  
