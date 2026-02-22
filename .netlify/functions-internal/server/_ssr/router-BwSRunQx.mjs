import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, u as useLocation, L as Link } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { M as Menu, X, C as Cog, W as Wrench } from "../_libs/lucide-react.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const totLogo = "/assets/totlogo-Cpz2jEva.png";
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  // { label: 'About Me', href: '/about' },
  // { label: 'Services', href: '/services' },
  // { label: 'Contact', href: '/contact' },
  // { label: 'Landing Section', href: '/#landing' },
  { label: "About Section", href: "/#about" },
  { label: "Services Section", href: "/#services" },
  { label: "Contact Section", href: "/#contact" }
];
function isRouteActive(pathname, hash, href) {
  if (href.startsWith("/#")) {
    return pathname === "/" && href === `/${hash}`;
  }
  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href);
}
function Header() {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const location = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed inset-x-0 top-0 z-50 border-b border-amber-200/70 bg-stone-50/85 backdrop-blur-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-24 max-w-6xl items-center justify-between px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "group flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-stone-200/60",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-amber-200 bg-white shadow-[0_8px_24px_-14px_rgba(120,90,50,0.7)]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-gradient-to-br from-amber-100/70 via-transparent to-teal-100/50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: totLogo,
                    alt: "Triple One Therapy logo",
                    className: "relative h-11 w-11 object-contain transition duration-300 group-hover:scale-105"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "leading-tight", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-base font-semibold tracking-[0.02em] text-stone-900", children: "Triple One" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs uppercase tracking-[0.2em] text-stone-500", children: "Therapy" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-2 rounded-full border border-stone-300/80 bg-white/65 p-1.5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.9)] md:flex", children: NAV_ITEMS.map((item) => {
          const active = isRouteActive(location.pathname, location.hash, item.href);
          const sharedClasses = "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200";
          const activeClasses = active ? "bg-stone-900 text-stone-50 shadow-[0_10px_22px_-16px_rgba(17,24,39,0.95)]" : "text-stone-700 hover:bg-stone-200/80";
          if (item.href.startsWith("/#")) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: item.href,
                className: `${sharedClasses} ${activeClasses}`,
                children: item.label
              },
              item.href
            );
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: item.href,
              className: `${sharedClasses} ${activeClasses}`,
              children: item.label
            },
            item.href
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "rounded-full border border-stone-300 bg-white p-2.5 text-stone-700 shadow-sm transition hover:bg-stone-100 md:hidden",
            "aria-label": "Open navigation menu",
            onClick: () => setIsOpen(true),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-sm transition md:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`,
        onClick: () => setIsOpen(false),
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `fixed right-0 top-0 z-50 h-full w-[19rem] border-l border-stone-300 bg-stone-100/95 p-4 shadow-xl backdrop-blur-md transition-transform duration-200 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/",
                className: "flex items-center gap-2 rounded-full px-2 py-1 hover:bg-stone-200",
                onClick: () => setIsOpen(false),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: totLogo, alt: "", className: "h-8 w-8 rounded-full border border-amber-200" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-stone-600", children: "Triple One" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "rounded-full border border-stone-300 bg-white p-2 text-stone-700 hover:bg-stone-100",
                "aria-label": "Close navigation menu",
                onClick: () => setIsOpen(false),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-2", children: NAV_ITEMS.map((item) => {
            const active = isRouteActive(location.pathname, location.hash, item.href);
            const classes = active ? "rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-stone-50" : "rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-stone-700 hover:border-stone-300 hover:bg-stone-200/70";
            if (item.href.startsWith("/#")) {
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: item.href,
                  className: classes,
                  onClick: () => setIsOpen(false),
                  children: item.label
                },
                item.href
              );
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: item.href,
                className: classes,
                onClick: () => setIsOpen(false),
                children: item.label
              },
              item.href
            );
          }) })
        ]
      }
    )
  ] });
}
function ParallaxBackground() {
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let frame = 0;
    const updateScrollVar = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        containerRef.current?.style.setProperty(
          "--scroll-y",
          String(window.scrollY)
        );
      });
    };
    updateScrollVar();
    window.addEventListener("scroll", updateScrollVar, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollVar);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "parallax-bg", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "parallax-gradient" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "parallax-layer layer-one" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "parallax-layer layer-two" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "parallax-layer layer-three" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "parallax-grid" })
  ] });
}
function UnderConstruction({
  isOpen,
  title = "Under Construction",
  message = "We are making a few updates and will be back shortly."
}) {
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[120] flex items-center justify-center bg-stone-950/70 p-6 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-300/60 bg-stone-50 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.65)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-full bg-[repeating-linear-gradient(45deg,#f59e0b_0_14px,#1f2937_14px_28px)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-8 py-10 sm:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-200/45 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-teal-200/45 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto mb-8 flex h-28 w-28 items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute h-24 w-24 animate-[spin_14s_linear_infinite] rounded-full border-4 border-stone-400/30 border-t-stone-600/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute h-16 w-16 rounded-full bg-stone-900 text-stone-100 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full items-center justify-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cog, { size: 16, className: "animate-[spin_5s_linear_infinite]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { size: 16 })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-center text-xs font-semibold uppercase tracking-[0.26em] text-amber-700", children: "Triple One Therapy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center text-3xl font-semibold text-stone-900 sm:text-4xl", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-stone-700 sm:text-lg", children: message }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-stone-700/70" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-stone-700/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-stone-700/30" })
      ] })
    ] })
  ] }) });
}
const appCss = "/assets/styles-C9hjp6WP.css";
const SITE_UNDER_CONSTRUCTION = true;
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Triple One Therapy"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "relative min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ParallaxBackground, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
        children
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(UnderConstruction, { isOpen: SITE_UNDER_CONSTRUCTION }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$3 = () => import("./services-BiLaUWhU.mjs");
const Route$3 = createFileRoute("/services")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./contact-C71Ce2KQ.mjs");
const Route$2 = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./about-CxX8EFbl.mjs");
const Route$1 = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DdgjsS58.mjs");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ServicesRoute = Route$3.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$4
});
const ContactRoute = Route$2.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$4
});
const AboutRoute = Route$1.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$4
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ContactRoute,
  ServicesRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router;
}
export {
  getRouter
};
