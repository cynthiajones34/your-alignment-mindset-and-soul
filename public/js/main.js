// ── Mobile nav toggle ────────────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });
}

// ── Active nav link ──────────────────────────────────────────────────────
document.querySelectorAll(".nav-links a, .nav-mobile a").forEach((link) => {
  if (link.href === window.location.href) {
    link.style.color = "var(--sage-dark)";
    link.style.fontWeight = "500";
  }
});

// ── Email opt-in forms (ConvertKit placeholder) ──────────────────────────
document.querySelectorAll(".optin-form, .footer-optin-form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector("input[type='email']").value;
    if (!email) return;

    // TODO Phase 2: replace with ConvertKit API call
    // POST to https://api.convertkit.com/v3/forms/{formId}/subscribe
    console.log("Opt-in:", email);

    const success = document.getElementById("optinSuccess");
    if (success) {
      success.style.display = "block";
      form.style.display    = "none";
    } else {
      form.innerHTML = `<p style="color:var(--sage-dark); font-weight:500;">
        You're in. Check your inbox for the 5-Day Alignment Reset.
      </p>`;
    }
  });
});

// ── Contact form ─────────────────────────────────────────────────────────
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector("button[type='submit']");
    btn.textContent = "Sending…";
    btn.disabled = true;

    // TODO Phase 2: wire to Firebase Function or Formspree
    await new Promise(r => setTimeout(r, 800));

    document.getElementById("contactSuccess").style.display = "block";
    contactForm.style.display = "none";
  });
}

// ── Scroll animations ────────────────────────────────────────────────────
(function () {
  const els = document.querySelectorAll("[data-animate]");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
  );

  els.forEach((el) => observer.observe(el));
})();

// ── Vibe Check application form ──────────────────────────────────────
const applyForm = document.getElementById("applyForm");
if (applyForm) {
  applyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = applyForm.querySelector("button[type='submit']");
    btn.textContent = "Submitting…";
    btn.disabled = true;

    const data = Object.fromEntries(new FormData(applyForm));

    try {
      const res = await fetch(
        "https://us-central1-you-alignment-mindset-and-soul.cloudfunctions.net/submitVibeCheck",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      );
      if (!res.ok) throw new Error("Server error");
    } catch (err) {
      btn.textContent = "Submit Application";
      btn.disabled = false;
      alert("Something went wrong. Please try again or email hello@yamswellness.com.");
      return;
    }

    document.getElementById("applySuccess").style.display = "block";
    applyForm.style.display = "none";
  });
}
