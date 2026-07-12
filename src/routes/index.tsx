import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import homeBackground2 from '../assets/backgrounds/home-bg-2.png'
import homeBackground1280 from '../assets/backgrounds/home-responsive/home-bg-1280.avif'
import homeBackground1920 from '../assets/backgrounds/home-responsive/home-bg-1920.avif'
import homeBackground1920Fallback from '../assets/backgrounds/home-responsive/home-bg-1920.jpg'
import homeBackground2560 from '../assets/backgrounds/home-responsive/home-bg-2560.avif'
import homeBackgroundMobile640 from '../assets/backgrounds/home-responsive/home-bg-mobile-640.avif'
import homeBackgroundMobile960 from '../assets/backgrounds/home-responsive/home-bg-mobile-960.avif'
import homeBackgroundMobileFallback from '../assets/backgrounds/home-responsive/home-bg-mobile-960.jpg'
import logo from '../assets/logos/logo-1.png'
import logo2 from '../assets/logos/logo-2.png'
// import logo3 from '../assets/logos/logo-3.png'
import photoBg from '../assets/backgrounds/photo-bg.png'
import photoBg2 from '../assets/backgrounds/photo-bg-2.png'
import SimplePracticeBookWidget from '@/components/SimplePracticeBookWidget'

export const Route = createFileRoute('/')({ component: App })

function App() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) {
      return
    }
    const target = document.getElementById(hash)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('scroll-reveal-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -12% 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <main className="bg-transparent text-stone-900">
      <section
        id="landing"
        className="section-anchor relative flex min-h-screen items-center overflow-hidden px-6 py-24"
      >
        <picture className="absolute inset-0">
          <source
            media="(max-width: 639px)"
            type="image/avif"
            srcSet={`${homeBackgroundMobile640} 640w, ${homeBackgroundMobile960} 960w`}
            sizes="100vw"
          />
          <source
            media="(max-width: 639px)"
            type="image/jpeg"
            srcSet={homeBackgroundMobileFallback}
          />
          <source
            type="image/avif"
            srcSet={`${homeBackground1280} 1280w, ${homeBackground1920} 1920w, ${homeBackground2560} 2560w`}
            sizes="100vw"
          />
          <img
            src={homeBackground1920Fallback}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            width="1920"
            height="1079"
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(22_18_16/28%)] to-[rgb(22_18_16/42%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1
            className="scroll-reveal mb-6 text-4xl leading-tight sm:text-6xl"
            data-reveal
            style={{
              color: "#ede8d1",
              fontFamily: "maharlika",
              letterSpacing: "0.2em",
            }}
          >
            triple one therapy
          </h1>
          <p
            className="scroll-reveal mb-6 text-4xl leading-tight sm:text-6xl"
            data-reveal
            style={{
              color: "#ede8d1",
              fontFamily: "maharlika",
              letterSpacing: "-0.15em",
              transitionDelay: "110ms",
            }}
          >
            111
          </p>
          <p
            className="scroll-reveal pinyon mb-6 text-[38px] leading-tight sm:text-[54px]"
            data-reveal
            style={{ color: "#ede8d1", transitionDelay: "190ms" }}
          >
            <span className="inline-block pe-[0.2em]">
              Depth-oriented therapy for the wandering soul
            </span>
          </p>
          <div
            className="scroll-reveal mt-10 flex flex-wrap justify-center gap-4"
            data-reveal
            style={{ transitionDelay: "280ms" }}
          >
            <SimplePracticeBookWidget
              label="Book a Consultation"
              // className="bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
              className="mt-16 inline-flex items-center justify-center border-[3px] border-[#ede8d1] px-8 py-3 text-2xl uppercase tracking-[0.28em] text-[#ede8d1] no-underline transition hover:bg-[#ede8d1] hover:text-[#433b2f] sm:px-14"
            />
          </div>
        </div>
      </section>
      <section
        id="landing-2"
        className="section-anchor relative flex min-h-screen items-center overflow-hidden px-6 py-24"
        style={{
          background: "#ede8d1",
        }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <img
            src={logo}
            alt="Triple One Therapy logo"
            className="scroll-reveal mx-auto mb-8 h-48 w-48 sm:h-48 sm:w-48"
            data-reveal
          />
          <p
            className="scroll-reveal mb-6 text-4xl leading-tight sm:text-6xl"
            data-reveal
            style={{
              transitionDelay: "120ms",
              color: "#3c3629",
              fontFamily: "maharlika",
              fontSize: 28,
            }}
          >
            111: in numerology, a number often associated with intuition,
            alignment, awakening, and new beginnings. It is considered a symbol
            of transformation and conscious change, magnifying moments of
            personal growth, clarity, and self-discovery.
          </p>
        </div>
      </section>
      <section
        id="landing-3"
        className="section-anchor relative flex min-h-screen items-center overflow-hidden px-6 py-24"
        style={{
          background: "#c6cbb1",
        }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <h2
            className="scroll-reveal mb-12 text-4xl leading-tight sm:text-6xl pinyon"
            data-reveal
            style={{ color: "#000" }}
          >
            you’ve come to the right place if…
          </h2>
          <p
            className="scroll-reveal mb-6 text-4xl leading-tight sm:text-6xl"
            data-reveal
            style={{
              color: "#3c3629",
              fontFamily: "maharlika",
              fontSize: 28,
              transitionDelay: "120ms",
            }}
          >
            you are in the transition between who you once were and who you are
            becoming: when old identities, relationships, beliefs, or directions
            no longer feel right, but the next version of yourself is still
            taking shape.
          </p>
          <p
            className="scroll-reveal mb-6 text-4xl leading-tight sm:text-6xl"
            data-reveal
            style={{
              color: "#3c3629",
              fontFamily: "maharlika",
              fontSize: 28,
              transitionDelay: "220ms",
            }}
          >
            this is a safe space for those moving through divorce,
            deconstruction, heartbreak, career shifts, existential questions,
            and the quiet, persistent search for a life that feels more like
            your own.
          </p>
        </div>
      </section>
      <section
        id="landing-4"
        className="section-anchor relative min-h-screen overflow-hidden"
        style={{
          background: "#ede8d1",
        }}
      >
        <div className="grid min-h-screen w-full md:grid-cols-[40%_60%]">
          <div className="relative min-h-[50vh] md:min-h-screen">
            <img
              src={photoBg}
              alt="Portrait for Triple One Therapy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex min-h-[50vh] items-center justify-center px-8 py-16 sm:px-12 md:min-h-screen md:px-20">
            <div className="flex max-w-3xl flex-col items-center text-center">
              <h2
                className="scroll-reveal pinyon text-4xl leading-tight text-black sm:text-5xl md:text-6xl"
                data-reveal
                style={{ fontSize: 38 }}
              >
                A glimpse into the human behind the work
              </h2>
              <a
                href="/about"
                className="scroll-reveal mt-16 inline-flex items-center justify-center border-[3px] border-black px-8 py-3 text-base uppercase tracking-[0.35em] text-black transition hover:bg-black hover:text-[#ede8d1] sm:px-10"
                data-reveal
                style={{ transitionDelay: "160ms" }}
              >
                Meet Cat
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        id="landing-5"
        className="section-anchor relative flex min-h-screen items-center overflow-hidden px-6 py-24"
        style={{
          backgroundImage: `linear-gradient(180deg, rgb(22 18 16 / 28%) 0%, rgb(22 18 16 / 42%) 100%), url("${homeBackground2}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <blockquote
            className="scroll-reveal mb-6 text-4xl leading-tight sm:text-6xl pinyon"
            data-reveal
            style={{ color: "#ede8d1" }}
          >
            "Between stimulus and response, there is a space. In that space is
            our power to choose our response. In our response lies our growth
            and our freedom."
          </blockquote>
          <cite
            className="scroll-reveal mb-6 text-4xl leading-tight sm:text-6xl"
            data-reveal
            style={{
              color: "#ede8d1",
              fontFamily: "maharlika",
              transitionDelay: "160ms",
              fontStyle: "normal",
            }}
          >
            Viktor Frankl
          </cite>
        </div>
      </section>
      <section
        id="landing-6"
        className="section-anchor relative min-h-screen overflow-hidden"
        style={{
          background: "#c6cbb1",
        }}
      >
        <div className="grid min-h-screen w-full md:grid-cols-[40%_60%]">
          <div className="flex min-h-[50vh] items-center justify-center px-8 py-16 sm:px-12 md:min-h-screen md:px-20">
            <div className="flex max-w-3xl flex-col items-center text-center">
              <h2
                className="scroll-reveal pinyon text-4xl leading-tight text-black sm:text-5xl md:text-6xl mb-6"
                data-reveal
                style={{ fontSize: 38 }}
              >
                Services
              </h2>
              <p
                className="scroll-reveal mb-6 text-4xl leading-tight sm:text-6xl"
                data-reveal
                style={{
                  color: "#3c3629",
                  fontFamily: "maharlika",
                  fontSize: 28,
                  transitionDelay: "120ms",
                }}
              >
                I offer individual therapy grounded in an existential approach.
              </p>
              <p
                className="scroll-reveal mb-6 text-4xl leading-tight sm:text-6xl"
                data-reveal
                style={{
                  color: "#3c3629",
                  fontFamily: "maharlika",
                  fontSize: 28,
                  transitionDelay: "220ms",
                }}
              >
                This work is less about quick fixes and more about understanding
                what your experience is asking of you. We slow things down
                enough to listen to what’s beneath your anxiety, overwhelm, and
                stagnation.
              </p>
              <a
                href="/services"
                className="scroll-reveal mt-16 inline-flex items-center justify-center border-[3px] border-black px-8 py-3 text-base uppercase tracking-[0.35em] text-black transition hover:bg-black hover:text-[#ede8d1] sm:px-10"
                data-reveal
                style={{ transitionDelay: "320ms" }}
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative min-h-[30vh] md:min-h-screen">
            <img
              src={photoBg2}
              alt="Portrait for Triple One Therapy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <section
        id="landing-contact-section"
        className="section-anchor relative flex min-h-screen items-center overflow-hidden px-6 py-16 sm:px-10 md:px-12 md:py-20"
        style={{
          background: "#433b2f",
        }}
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="max-w-3xl">
            <h2
              className="scroll-reveal pinyon text-[4rem] leading-none text-[#ede8d1] sm:text-[5.5rem] md:text-[6.75rem]"
              data-reveal
            >
              Contact Us
            </h2>
            <p
              className="scroll-reveal mt-6 max-w-2xl text-3xl leading-tight text-[#ede8d1] sm:text-4xl"
              data-reveal
              style={{ fontFamily: "maharlika" }}
            >
              Here for you whenever you&apos;re ready.
            </p>

            <div className="mt-20 space-y-10">
              <div
                className="scroll-reveal grid gap-2 md:grid-cols-[11rem_1fr] md:items-start"
                data-reveal
                style={{ transitionDelay: "120ms" }}
              >
                <div className="text-3xl font-semibold text-[#ede8d1]">
                  Call or text
                </div>
                <a
                  href="tel:8067070111"
                  className="text-3xl text-[#ede8d1] transition hover:opacity-80"
                  style={{ fontFamily: "maharlika" }}
                >
                  806-707-0111
                </a>
              </div>

              <div
                className="scroll-reveal grid gap-2 md:grid-cols-[11rem_1fr] md:items-start"
                data-reveal
                style={{ transitionDelay: "200ms" }}
              >
                <div className="text-3xl font-semibold text-[#ede8d1]">
                  Email
                </div>
                <a
                  href="mailto:triple1therapy@gmail.com"
                  className="break-all text-3xl text-[#ede8d1] transition hover:opacity-80 sm:break-normal"
                  style={{ fontFamily: "maharlika" }}
                >
                  triple1therapy@gmail.com
                </a>
              </div>

              <div
                className="scroll-reveal grid gap-2 md:grid-cols-[11rem_1fr] md:items-start"
                data-reveal
                style={{ transitionDelay: "280ms" }}
              >
                <div className="text-3xl font-semibold text-[#ede8d1]">
                  Address
                </div>
                <address
                  className="not-italic text-3xl leading-tight text-[#ede8d1]"
                  style={{ fontFamily: "maharlika" }}
                >
                  3610 34th Street
                  <br />
                  Lubbock, TX 79410
                </address>
              </div>
            </div>

            {/* <a
              href="/contact"
              className="scroll-reveal mt-16 inline-flex items-center justify-center border-[3px] border-[#ede8d1] px-8 py-3 text-2xl uppercase tracking-[0.28em] text-[#ede8d1] transition hover:bg-[#ede8d1] hover:text-[#433b2f] sm:px-14"
              data-reveal
              style={{ transitionDelay: "360ms" }}
            >
              I&apos;m Ready
            </a> */}
            <SimplePracticeBookWidget
              label="I'm Ready"
              data-reveal
              style={{ transitionDelay: "360ms" }}
              className="scroll-reveal mt-16 inline-flex items-center justify-center border-[3px] border-[#ede8d1] px-8 py-3 text-2xl uppercase tracking-[0.28em] text-[#ede8d1] no-underline transition hover:bg-[#ede8d1] hover:text-[#433b2f] sm:px-14"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="grid w-full max-w-[28rem] grid-cols-[1fr_auto] items-center gap-6 sm:gap-10">
              <div className="flex justify-center">
                <img
                  src={logo2}
                  alt="Triple One Therapy sun mark"
                  className="h-44 w-44 object-contain sm:h-56 sm:w-56 md:h-64 md:w-64"
                />
              </div>
              {/* <div className="flex justify-center">
                <img
                  src={logo3}
                  alt="Triple One Therapy symbol set"
                  className="h-56 w-auto object-contain sm:h-72 md:h-80"
                />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* <section
        id="about"
        className="section-anchor flex min-h-screen items-center border-y border-stone-300 px-6 py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-stone-500">
              About Me
            </p>
            <h2 className="mb-4 text-3xl font-semibold sm:text-4xl">
              Person-centered care with structured tools
            </h2>
            <p className="text-base leading-relaxed text-stone-700">
              Triple One Therapy combines evidence-based methods with a
              personalized approach. Sessions are tailored around your goals,
              pace, and lived experience.
            </p>
          </div>
          <div className="route-card rounded-2xl border border-stone-300 bg-stone-50 p-6">
            <h3 className="mb-4 text-xl font-semibold">Areas of Focus</h3>
            <ul className="space-y-3 text-stone-700">
              <li>Anxiety and stress management</li>
              <li>Life transitions and burnout</li>
              <li>Relationship and communication challenges</li>
              <li>Trauma-informed support</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="section-anchor flex min-h-screen items-center px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-stone-500">
              Services
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              How I Can Support You
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="route-card rounded-2xl border border-stone-300 bg-stone-50 p-6 sm:p-8">
              <h3 className="text-2xl font-semibold">
                Individual Psychotherapy
              </h3>
              <p className="mt-3 text-stone-700">
                One-on-one therapy tailored to your needs and goals.
              </p>
              <p className="mt-5 text-lg font-semibold text-stone-900">$130</p>
            </article>

            <article className="route-card rounded-2xl border border-stone-300 bg-stone-50 p-6 sm:p-8">
              <h3 className="text-2xl font-semibold">Group Therapy</h3>
              <p className="mt-3 text-stone-700">
                Supportive group sessions focused on shared growth and
                connection.
              </p>
              <p className="mt-5 text-lg font-semibold text-stone-900">
                Price varies
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="section-anchor flex min-h-screen items-center px-6 py-24"
      >
        <div className="mx-auto max-w-5xl rounded-2xl border border-stone-300 bg-stone-50 p-8 text-center sm:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-stone-500">
            Contact
          </p>
          <h2 className="mb-5 text-3xl font-semibold sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto max-w-2xl text-stone-700">
            Reach out to schedule an introductory call and see if we are a fit.
            I respond to all inquiries within 1-2 business days.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
          >
            Open Contact Page
          </a>
        </div>
      </section> */}
    </main>
  );
}
