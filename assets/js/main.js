/* PeepHole landing interactions (vanilla JS) */
(() => {
  const $ = (q, el = document) => el.querySelector(q);
  const $$ = (q, el = document) => Array.from(el.querySelectorAll(q));

  // 1) Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.classList.add("visible");
      }
    },
    { threshold: 0.18 }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  // 2) Active nav link while scrolling
  const navLinks = $$(".nav a[href^='#']");
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const spy = () => {
    const y = window.scrollY + 120;
    let current = sections[0];
    for (const s of sections) {
      if (s.offsetTop <= y) current = s;
    }
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current.id}`));
  };
  window.addEventListener("scroll", spy, { passive: true });
  spy();

  // 3) Smooth scrolling with offset for sticky topbar
  navLinks.forEach((a) => {
    a.addEventListener("click", (ev) => {
      ev.preventDefault();
      const id = a.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // 4) Faux waitlist form (client-side only)
  const form = $("#waitlistForm");
  const toast = $("#toast");
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove("show"), 2400);
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = $("#email")?.value?.trim() ?? "";
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast("Entre un email valide (oui, même pour une démo).");
        $("#email")?.focus();
        return;
      }
      // TODO: replace with your endpoint (e.g. Formspark, ConvertKit, Supabase edge function)
      form.reset();
      showToast("Inscription enregistrée. Ton futur moi te remerciera.");
    });
  }

  // 5) Gentle parallax for blobs (super subtle)
  const blobs = $$(".blob");
  let raf = null;
  const onMove = (ev) => {
    const x = (ev.clientX / window.innerWidth - 0.5) * 2;
    const y = (ev.clientY / window.innerHeight - 0.5) * 2;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      blobs.forEach((b, i) => {
        const s = 10 + i * 6;
        b.style.transform = `translate(${x * s}px, ${y * s}px)`;
      });
    });
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  // 6) Keyboard shortcut: press "/" to focus email input
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const active = document.activeElement;
      const typing = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
      if (!typing) {
        e.preventDefault();
        $("#email")?.focus();
      }
    }
  });
})();
