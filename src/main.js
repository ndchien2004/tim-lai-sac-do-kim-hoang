import "@fontsource-variable/playfair-display/wght.css";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/literata/wght.css";
import "@fontsource-variable/literata/wght-italic.css";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";
import "./styles.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const animate = root.classList.contains("anim") && !reduceMotion;

window.__storyReady = true;

/* --------------------------------------------------------------------------
   Cuộn mượt (Lenis) đồng bộ với GSAP ScrollTrigger
   -------------------------------------------------------------------------- */
let lenis = null;
if (!reduceMotion) {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis; // tiện cho kiểm thử tự động
}

const headerH = () => $("#siteHeader").offsetHeight;

function scrollToTarget(target) {
  if (!target) return;
  const offset = target.id === "top" ? 0 : -headerH() + 1;
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.6 });
  else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: reduceMotion ? "auto" : "smooth" });
}

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href").slice(1);
  const target = id ? document.getElementById(id) : null;
  if (!target) return;
  e.preventDefault();
  closeMenu();
  scrollToTarget(target);
  history.replaceState(null, "", "#" + id);
});

/* --------------------------------------------------------------------------
   Header: trạng thái cuộn, nền tối/đỏ, ẩn khi cuộn xuống
   -------------------------------------------------------------------------- */
const header = $("#siteHeader");
const bar = $("#readingBar");
let lastY = window.scrollY;

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  header.classList.toggle("scrolled", y > 24);
  const menuOpen = root.classList.contains("menu-open");
  if (!menuOpen) header.classList.toggle("is-hidden", y > lastY + 4 && y > window.innerHeight * 0.9);
  if (y < lastY - 4) header.classList.remove("is-hidden");
  lastY = y;
}
if (lenis) lenis.on("scroll", onScroll);
else window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Đổi màu header theo nền phía dưới
const toneSections = $$(".hero, .dark-section, .red-section, .site-footer");
function refreshTone() {
  const probe = headerH() / 2;
  const sec = toneSections.find((el) => {
    const r = el.getBoundingClientRect();
    return r.top <= probe && r.bottom > probe;
  });
  header.classList.toggle("on-dark", !!sec);
  header.classList.toggle("on-red", !!sec && sec.classList.contains("red-section"));
}
if (lenis) lenis.on("scroll", refreshTone);
else window.addEventListener("scroll", refreshTone, { passive: true });
refreshTone();

// Mục lục đang đọc
const navLinks = $$(".chapter-nav a");
$$("[data-section^='chapter']").forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec,
    start: "top 45%",
    end: "bottom 45%",
    onToggle: (self) => {
      const link = navLinks.find((a) => a.dataset.nav === sec.id);
      if (!link) return;
      if (self.isActive) {
        navLinks.forEach((a) => { a.classList.remove("active"); a.removeAttribute("aria-current"); });
        link.classList.add("active");
        link.setAttribute("aria-current", "location");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    },
  });
});

/* --------------------------------------------------------------------------
   Menu di động
   -------------------------------------------------------------------------- */
const toggle = $("#menuToggle");
function closeMenu() {
  if (!root.classList.contains("menu-open")) return;
  root.classList.remove("menu-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.querySelector(".sr-only").textContent = "Mở mục lục";
  lenis && lenis.start();
}
toggle.addEventListener("click", () => {
  const open = !root.classList.contains("menu-open");
  root.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector(".sr-only").textContent = open ? "Đóng mục lục" : "Mở mục lục";
  header.classList.remove("is-hidden");
  if (lenis) open ? lenis.stop() : lenis.start();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
window.matchMedia("(min-width: 821px)").addEventListener("change", (e) => e.matches && closeMenu());

/* --------------------------------------------------------------------------
   So sánh cũ / mới
   -------------------------------------------------------------------------- */
const compare = $("#compare");
const range = $("#compareRange");
function setCompare(v) {
  compare.style.setProperty("--pos", v + "%");
  range.value = v;
}
function sizeCompare() {
  compare.style.setProperty("--compare-w", compare.offsetWidth + "px");
}
range.addEventListener("input", () => setCompare(range.value));
range.addEventListener("pointerdown", () => compare.classList.add("is-dragging"));
window.addEventListener("pointerup", () => compare.classList.remove("is-dragging"));
new ResizeObserver(sizeCompare).observe(compare);
setCompare(range.value);

/* --------------------------------------------------------------------------
   Dòng thời gian: gợi ý thao tác theo thiết bị
   -------------------------------------------------------------------------- */
const timelineHint = $(".timeline-hint");
const hintDefault = timelineHint.innerHTML;

/* --------------------------------------------------------------------------
   Quy trình: đĩa màu đổi theo công đoạn
   -------------------------------------------------------------------------- */
const disc = $("#processDisc");
const steps = $$(".process-step");
function activateStep(i) {
  steps.forEach((s, j) => s.classList.toggle("is-active", j === i));
  disc.style.setProperty("--disc-color", steps[i].dataset.color);
  disc.dataset.step = String(i + 1);
}
steps.forEach((step, i) => {
  ScrollTrigger.create({
    trigger: step,
    start: "top 60%",
    end: "bottom 60%",
    onToggle: (self) => self.isActive && activateStep(i),
  });
});
activateStep(0);
ScrollTrigger.create({
  trigger: ".process-steps",
  start: "top 60%",
  end: "bottom 60%",
  onUpdate: (self) => disc.style.setProperty("--p", (self.progress * 100).toFixed(1) + "%"),
});

/* --------------------------------------------------------------------------
   Tiện ích: tách chữ, đếm số
   -------------------------------------------------------------------------- */
function splitWords(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
          else {
            const s = document.createElement("span");
            s.className = "word";
            s.textContent = part;
            frag.appendChild(s);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && child.tagName !== "BR") walk(child);
    });
  };
  walk(el);
  return $$(".word", el);
}

function countUp(el) {
  const nodes = [];
  const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) if (/^\d+$/.test(tw.currentNode.textContent.trim())) nodes.push(tw.currentNode);
  nodes.forEach((n) => {
    const end = parseInt(n.textContent, 10);
    const obj = { v: 0 };
    n.textContent = "0";
    gsap.to(obj, {
      v: end,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => (n.textContent = Math.round(obj.v)),
    });
  });
}

function prepStroke(paths) {
  paths.forEach((p) => {
    const len = p.getTotalLength ? p.getTotalLength() : 0;
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
  });
}

/* --------------------------------------------------------------------------
   Animation
   -------------------------------------------------------------------------- */
const mm = gsap.matchMedia();

if (animate) {
  /* ----- Hero: mở màn ----- */
  const h1 = $(".hero h1");
  [...h1.children].forEach((line) => {
    const mask = document.createElement("span");
    mask.className = "line-mask";
    line.replaceWith(mask);
    mask.appendChild(line);
  });

  gsap.set([".hero-content", ".scroll-cue", ".hero-caption"], { autoAlpha: 1 });
  const intro = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
  intro
    .from(".hero-sun", { scale: 0.6, autoAlpha: 0, duration: 2.2 }, 0)
    .from(".hero-grid", { autoAlpha: 0, duration: 2 }, 0.2)
    .from(".hero .eyebrow", { y: 20, autoAlpha: 0, duration: 1.1 }, 0.35)
    .from(".hero h1 .line-mask > *", { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0.4)
    .from(".hero-photo-frame", { y: 80, rotate: 12, autoAlpha: 0, duration: 1.8 }, 0.45)
    .from(".hero-photo figcaption", { y: 12, autoAlpha: 0, duration: 1 }, 1.3)
    .from(".hero-photo-seal", { scale: 1.9, rotate: -40, autoAlpha: 0, duration: 0.8, ease: "back.out(2.2)" }, 1.45)
    .from(".hero-deck", { y: 24, autoAlpha: 0, duration: 1.2 }, 0.95)
    .from(".byline", { y: 18, autoAlpha: 0, duration: 1.1 }, 1.1)
    .from([".scroll-cue", ".hero-caption"], { y: 14, autoAlpha: 0, duration: 1, stagger: 0.1 }, 1.4);

  /* ----- Hero: parallax khi cuộn ----- */
  const heroST = { trigger: ".hero", start: "top top", end: "bottom top", scrub: true };
  gsap.to(".hero-sun", { yPercent: 28, scale: 1.12, ease: "none", scrollTrigger: heroST });
  gsap.to(".hero-photo", { y: () => -window.innerHeight * 0.12, ease: "none", scrollTrigger: heroST });
  gsap.to(".hero-photo-frame", { rotate: -2, ease: "none", scrollTrigger: heroST });
  gsap.to(".hero-content", { yPercent: -18, autoAlpha: 0.15, ease: "none", scrollTrigger: { ...heroST, start: "20% top" } });
  gsap.to(".hero-ink--one", { yPercent: -30, ease: "none", scrollTrigger: heroST });
  gsap.to(".hero-ink--two", { yPercent: 40, ease: "none", scrollTrigger: heroST });
  gsap.to(".scroll-cue", { autoAlpha: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "15% top", scrub: true } });

  /* ----- Hiện dần chung ----- */
  const special = ".print-trio, .loss-sequence, .numbers-band, .color-swatches, .timeline-wrap, .pull-quote, .loss-quote, .final-quote, .identity-question";
  $$(".reveal").forEach((el) => {
    if (el.matches(special) || el.parentElement.closest(special)) return;
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 56 },
      { autoAlpha: 1, y: 0, duration: 1.3, ease: "expo.out", clearProps: "opacity,transform", scrollTrigger: { trigger: el, start: "top 88%", once: true } }
    );
  });

  // Nhóm có các phần tử con xuất hiện so le
  [
    [".print-trio", ".print-card", { y: 80, rotate: (i) => [-3, 1.5, -1][i] || 0 }],
    [".loss-sequence", ".loss-card", { y: 60 }],
    [".numbers-band", ":scope > div", { y: 40 }],
  ].forEach(([wrapSel, childSel, from]) => {
    $$(wrapSel).forEach((wrap) => {
      gsap.set(wrap, { autoAlpha: 1 });
      gsap.from($$(childSel, wrap), {
        autoAlpha: 0,
        ...from,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.12,
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: wrap, start: "top 82%", once: true },
      });
    });
  });
  $$(".loss-card").forEach((c) => c.classList.remove("reveal"));

  // Trích dẫn: từng chữ sáng dần theo cuộn
  $$(".pull-quote, .loss-quote, .final-quote, .identity-question").forEach((q) => {
    gsap.set(q, { autoAlpha: 1 });
    const target = q.matches(".identity-question") ? $("h3", q) : q;
    const words = splitWords(target.matches("blockquote") ? target : target);
    gsap.fromTo(
      words,
      { opacity: 0.12, y: 8 },
      { opacity: 1, y: 0, ease: "none", stagger: 0.05, scrollTrigger: { trigger: q, start: "top 80%", end: "bottom 55%", scrub: 0.6 } }
    );
    if (q.matches(".pull-quote")) gsap.from(".quote-mark", { yPercent: 40, autoAlpha: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: q, start: "top 85%", once: true } });
    if (q.matches(".identity-question")) {
      gsap.from($$(".identity-columns p", q), { y: 40, autoAlpha: 0, stagger: 0.15, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: $(".identity-columns", q), start: "top 88%", once: true } });
      gsap.from($(":scope > p", q), { y: 20, autoAlpha: 0, duration: 1, scrollTrigger: { trigger: q, start: "top 85%", once: true } });
    }
  });

  // Tiêu đề chương: số lớn trượt lên, chữ động từ trượt ngang
  $$(".chapter-heading").forEach((h) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: h, start: "top 85%", once: true } });
    tl.from($(".chapter-index strong", h), { yPercent: 60, autoAlpha: 0, duration: 1.4, ease: "expo.out" }, 0)
      .from($(".chapter-verb", h), { x: -30, autoAlpha: 0, duration: 1.1, ease: "expo.out" }, 0.15)
      .from($("h2", h), { y: 30, autoAlpha: 0, duration: 1.3, ease: "expo.out" }, 0.25);
    gsap.to($(".chapter-index strong", h), { yPercent: -25, ease: "none", scrollTrigger: { trigger: h, start: "top bottom", end: "bottom top", scrub: true } });
  });

  /* ----- Mở đầu ----- */
  countUp($(".opening-number strong"));
  $$(".numbers-band strong").forEach(countUp);

  const village = $(".village-visual");
  const vST = { trigger: village, start: "top bottom", end: "bottom top", scrub: true };
  gsap.fromTo(".sun-disc", { yPercent: 60 }, { yPercent: -40, ease: "none", scrollTrigger: vST });
  gsap.fromTo(".village-line--far", { xPercent: 0, yPercent: 8 }, { xPercent: -3, yPercent: -4, ease: "none", scrollTrigger: vST });
  gsap.fromTo(".village-line--near", { xPercent: -3 }, { xPercent: 0, ease: "none", scrollTrigger: vST });
  gsap.fromTo(village, { clipPath: "inset(12% 8% 12% 8% round 4px)" }, { clipPath: "inset(0% 0% 0% 0% round 4px)", ease: "none", scrollTrigger: { trigger: village, start: "top 95%", end: "top 30%", scrub: true } });

  /* ----- Phần 01 ----- */
  const portrait = $(".portrait-paper");
  gsap.from($$(".block-stack i", portrait), { x: 60, autoAlpha: 0, stagger: 0.1, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: portrait, start: "top 70%", once: true } });
  gsap.from(".portrait-word", { yPercent: 30, autoAlpha: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: portrait, start: "top 70%", once: true } });
  gsap.fromTo(".portrait-silhouette", { yPercent: 8 }, { yPercent: -4, ease: "none", scrollTrigger: { trigger: portrait, start: "top bottom", end: "bottom top", scrub: true } });

  const mapPaths = $$(".map-card svg path");
  prepStroke(mapPaths);
  gsap.to(mapPaths, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", stagger: 0.2, scrollTrigger: { trigger: ".map-card", start: "top 75%", once: true } });
  gsap.from(".map-pin", { y: 20, autoAlpha: 0, duration: 1, ease: "back.out(1.8)", delay: 1, scrollTrigger: { trigger: ".map-card", start: "top 75%", once: true } });

  gsap.from(".color-swatches span", { y: 50, rotate: (i) => (i % 2 ? 8 : -8), autoAlpha: 0, stagger: 0.1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".color-swatches", start: "top 90%", once: true } });
  gsap.fromTo(".red-paper-manifesto strong", { scale: 0.86, letterSpacing: "0.02em" }, { scale: 1, letterSpacing: "-0.04em", ease: "none", scrollTrigger: { trigger: ".red-paper-manifesto", start: "top 90%", end: "center 50%", scrub: true } });

  /* ----- Phần 02: sắc đỏ phai dần ----- */
  gsap.fromTo(".faded-red", { autoAlpha: 1, scale: 1 }, { autoAlpha: 0.15, scale: 0.7, ease: "none", scrollTrigger: { trigger: ".chapter-two", start: "top 60%", end: "45% top", scrub: true } });
  gsap.from(".loss-intro strong", { y: 40, autoAlpha: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".loss-intro", start: "top 85%", once: true } });
  $$(".loss-year").forEach((y) => gsap.from(y, { scale: 0.6, autoAlpha: 0, duration: 0.9, ease: "back.out(2)", scrollTrigger: { trigger: y, start: "top 90%", once: true } }));

  /* ----- Phần 03 ----- */
  const wood = $(".woodblock");
  const woodPaths = $$("svg path", wood);
  prepStroke(woodPaths);
  gsap.to(woodPaths, { strokeDashoffset: 0, ease: "none", stagger: 0.1, scrollTrigger: { trigger: wood, start: "top 80%", end: "center 40%", scrub: 0.8 } });
  gsap.fromTo(wood, { rotateY: -14, rotateX: 6, transformPerspective: 1200 }, { rotateY: 6, rotateX: -2, ease: "none", scrollTrigger: { trigger: wood, start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".giant-zero", { scale: 0.6, autoAlpha: 0, rotate: -12 }, { scale: 1, autoAlpha: 1, rotate: 0, ease: "none", scrollTrigger: { trigger: ".woodblock-stage", start: "top 80%", end: "center 55%", scrub: true } });

  /* ----- Phần 04 ----- */
  gsap.from(".paper-canopy i", { yPercent: -120, autoAlpha: 0, stagger: 0.08, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".paper-canopy", start: "top 85%", once: true } });
  gsap.fromTo(".process-intro strong", { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: ".process-intro", start: "top 85%", end: "center 55%", scrub: true } });
  gsap.to("#processDisc", { rotate: 120, ease: "none", scrollTrigger: { trigger: ".process-layout", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.to(".process-rooster-mini", { rotate: -126, ease: "none", scrollTrigger: { trigger: ".process-layout", start: "top bottom", end: "bottom top", scrub: true } });

  // Thanh so sánh tự "lướt" một lần để gợi ý
  const demo = { v: 50 };
  gsap.timeline({ scrollTrigger: { trigger: compare, start: "top 70%", once: true } })
    .to(demo, { v: 22, duration: 0.9, ease: "power2.inOut", onUpdate: () => setCompare(demo.v) })
    .to(demo, { v: 74, duration: 1.1, ease: "power2.inOut", onUpdate: () => setCompare(demo.v) })
    .to(demo, { v: 50, duration: 0.8, ease: "power2.inOut", onUpdate: () => setCompare(demo.v) });

  $$(".step-photo img").forEach((img) => {
    gsap.fromTo(img, { clipPath: "inset(0 0 100% 0)", scale: 1.12 }, { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: img, start: "top 85%", once: true } });
  });

  /* ----- Phần 05 ----- */
  gsap.from(".desks i", { y: 50, rotateX: 70, autoAlpha: 0, stagger: { each: 0.08, grid: [2, 3], from: "start" }, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".classroom-visual", start: "top 75%", once: true } });
  gsap.from(".desks i span", { scale: 0, rotate: 30, stagger: 0.08, duration: 0.9, ease: "back.out(2)", delay: 0.5, scrollTrigger: { trigger: ".classroom-visual", start: "top 75%", once: true } });
  gsap.from(".four-traditions i", { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".four-traditions", start: "top 88%", once: true } });
  gsap.from(".dream-grid li", { x: 40, autoAlpha: 0, stagger: 0.12, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".dream-grid", start: "top 80%", once: true } });

  // Tờ tranh được nhấc khỏi ván in
  const fp = $(".final-print");
  const fpPaths = $$(".final-paper svg path", fp);
  prepStroke(fpPaths);
  const lift = gsap.timeline({ scrollTrigger: { trigger: fp, start: "top 80%", end: "bottom 40%", scrub: 0.8 } });
  lift
    .fromTo(".printing-hand", { y: -60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power2.out", duration: 0.15 }, 0)
    .fromTo(".printing-hand", { yPercent: 0 }, { y: () => fp.offsetHeight * 0.72, ease: "power1.inOut", duration: 0.5 }, 0.15)
    .to(fpPaths, { strokeDashoffset: 0, ease: "power1.inOut", stagger: 0.04, duration: 0.5 }, 0.15)
    .to(".printing-hand", { autoAlpha: 0, ease: "power1.in", duration: 0.15 }, 0.65)
    .fromTo(".final-paper", { rotateX: 0, y: 0, transformPerspective: 900 }, { rotateX: 14, y: -28, rotate: -3, ease: "power1.inOut", duration: 0.35 }, 0.65);

  /* ----- Footer ----- */
  gsap.from(".footer-stamp", { rotate: -40, scale: 1.6, autoAlpha: 0, duration: 1, ease: "back.out(1.8)", scrollTrigger: { trigger: ".site-footer", start: "top 80%", once: true } });

  /* ----- Dòng thời gian: ghim & cuộn ngang trên màn rộng ----- */
  mm.add("(min-width: 900px)", () => {
    const wrap = $(".timeline-wrap");
    const tl = $("#timeline");
    wrap.classList.add("is-pinned");
    timelineHint.innerHTML = "Cuộn xuống để đi qua dòng thời gian <span>↓</span>";
    const items = $$("article", tl);
    gsap.set(wrap, { autoAlpha: 1 });
    const distance = () => Math.max(0, tl.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(tl).paddingLeft));
    const tween = gsap.to(items, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "center center",
        end: () => "+=" + distance(),
        pin: true,
        refreshPriority: 1,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => tl.style.setProperty("--progress", self.progress.toFixed(3)),
      },
    });
    items.forEach((it) => {
      gsap.from(it, {
        autoAlpha: 0.15,
        y: 30,
        ease: "power2.out",
        scrollTrigger: { trigger: it, containerAnimation: tween, start: "left 92%", end: "left 60%", scrub: true },
      });
    });
    return () => {
      wrap.classList.remove("is-pinned");
      timelineHint.innerHTML = hintDefault;
      tl.style.removeProperty("--progress");
    };
  });
  mm.add("(max-width: 899px)", () => {
    const wrap = $(".timeline-wrap");
    gsap.fromTo(wrap, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: wrap, start: "top 88%", once: true } });
  });
}

/* --------------------------------------------------------------------------
   Khởi động
   -------------------------------------------------------------------------- */
// Khi font tải xong, bố cục có thể thay đổi — tính lại vị trí trigger
document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
  refreshTone();
  if (location.hash) {
    const t = document.getElementById(location.hash.slice(1));
    if (t) setTimeout(() => scrollToTarget(t), 100);
  }
});
