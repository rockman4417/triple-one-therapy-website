import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
function App() {
  reactExports.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      return;
    }
    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-transparent pt-20 text-stone-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "landing", className: "section-anchor relative overflow-hidden px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-xs uppercase tracking-[0.24em] text-stone-500", children: "Welcome" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 text-4xl font-bold leading-tight sm:text-6xl", children: "Triple One Therapy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-3xl text-lg leading-relaxed text-stone-700 sm:text-xl", children: "A calm, supportive space for individuals and families seeking practical therapy with compassion and clarity." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/contact", className: "rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700", children: "Book a Consultation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#about", className: "rounded-full border border-stone-400 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-600", children: "Learn More" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "section-anchor border-y border-stone-300 px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl gap-10 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs uppercase tracking-[0.24em] text-stone-500", children: "About Me" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-3xl font-semibold sm:text-4xl", children: "Person-centered care with structured tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-stone-700", children: "Triple One Therapy combines evidence-based methods with a personalized approach. Sessions are tailored around your goals, pace, and lived experience." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-300 bg-stone-50 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-xl font-semibold", children: "Areas of Focus" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-stone-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Anxiety and stress management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Life transitions and burnout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Relationship and communication challenges" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Trauma-informed support" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "services", className: "section-anchor px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs uppercase tracking-[0.24em] text-stone-500", children: "Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold sm:text-4xl", children: "How I Can Support You" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-stone-300 bg-stone-50 p-6 sm:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold", children: "Individual Psycho therapy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-stone-700", children: "One-on-one therapy tailored to your needs and goals." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg font-semibold text-stone-900", children: "$130" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-stone-300 bg-stone-50 p-6 sm:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold", children: "Group Therapy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-stone-700", children: "Supportive group sessions focused on shared growth and connection." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg font-semibold text-stone-900", children: "Price varies" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "section-anchor px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl rounded-2xl border border-stone-300 bg-stone-50 p-8 text-center sm:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs uppercase tracking-[0.24em] text-stone-500", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-3xl font-semibold sm:text-4xl", children: "Ready to get started?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-stone-700", children: "Reach out to schedule an introductory call and see if we are a fit. I respond to all inquiries within 1-2 business days." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/contact", className: "mt-8 inline-block rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700", children: "Open Contact Page" })
    ] }) })
  ] });
}
export {
  App as component
};
