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

// ── Email opt-in forms ───────────────────────────────────────────────────
document.querySelectorAll(".optin-form, .footer-optin-form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = form.querySelector("input[type='email']");
    const email = emailInput.value.trim();
    if (!email) return;

    const btn = form.querySelector("button[type='submit']") || form.querySelector("button");
    const originalText = btn ? btn.textContent : null;
    if (btn) { btn.textContent = "Sending…"; btn.disabled = true; }

    try {
      const res = await fetch(
        "https://us-central1-you-alignment-mindset-and-soul.cloudfunctions.net/submitOptIn",
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }
      );
      if (!res.ok) throw new Error("Server error");
    } catch (_) {
      if (btn) { btn.textContent = originalText; btn.disabled = false; }
      return;
    }

    const success = document.getElementById("optinSuccess");
    if (success) {
      success.style.display = "block";
      form.style.display    = "none";
    } else {
      form.innerHTML = `<p style="color:var(--sage-dark); font-weight:500;">You're in. Check your inbox for the 5-Day Alignment Reset.</p>`;
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

    const data = Object.fromEntries(new FormData(contactForm));

    try {
      const res = await fetch(
        "https://us-central1-you-alignment-mindset-and-soul.cloudfunctions.net/submitContact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      );
      if (!res.ok) throw new Error("Server error");
    } catch (err) {
      btn.textContent = "Send Message";
      btn.disabled = false;
      alert("Something went wrong. Please try again or email journey@myyams.com.");
      return;
    }

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
      alert("Something went wrong. Please try again or email journey@myyams.com.");
      return;
    }

    document.getElementById("applySuccess").style.display = "block";
    applyForm.style.display = "none";
  });
}
