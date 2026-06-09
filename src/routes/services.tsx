import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import servicesBg1 from '../assets/backgrounds/services-bg-1.png';
import servicesBg2 from '../assets/backgrounds/services-bg-2.png';
import SimplePracticeBookWidget from '@/components/SimplePracticeBookWidget';

export const Route = createFileRoute('/services')({ component: ServicesPage })

function ServicesPage() {
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
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("scroll-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <main className="bg-transparent pt-20 text-stone-900">
      <section
        id="intro"
        className="section-anchor relative flex min-h-screen items-center overflow-hidden px-6 py-24"
        style={{
          background: "#ede8d1",
        }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <h1
            className="scroll-reveal mb-12 text-4xl leading-tight sm:text-6xl pinyon"
            data-reveal
            style={{ color: "#000" }}
          >
            The Framework
          </h1>
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
            Existential therapy centers on meaning, identity, freedom of choice,
            and responsibility. It asks not only what you are struggling with,
            but what your experience is pointing you toward. It aims to help you
            understand that you are the Magician in your story: you have the
            power to craft the life that is calling to you.
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
            I also draw from aspects of Interpersonal and Social Rhythm Therapy
            (IPSRT) when working with mood-related concerns, supporting
            stability through patterns, routines, and relational rhythms
            alongside deeper existential work. I typically incorporate
            contemplative eastern perspectives of mindfulness, acceptance, and
            non-attachment.
          </p>
        </div>
      </section>
      <section
        id="intro-bg"
        className="section-anchor relative flex min-h-screen items-center overflow-hidden px-6 py-24"
        style={{
          backgroundImage: `linear-gradient(180deg, rgb(22 18 16 / 28%) 0%, rgb(22 18 16 / 42%) 100%), url("${servicesBg1}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></section>
      <section
        id="intro-2"
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
            The Process
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
            In our work together, I help you explore patterns of thought and
            emotion while also holding space for the deeper questions underneath
            them, especially during periods of transition or uncertainty.
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
            I work with concerns such as anxiety, bipolar disorder, addiction,
            and major life transitions, always with the intent of helping you
            find peace, clarity and meaning through suffering and move toward
            greater fulfillment and purpose.
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
            The goal is not to become someone else, but to understand yourself
            more fully and begin living in a way that feels more aligned with
            who you are and who you want to be.
          </p>
        </div>
      </section>
      <section
        id="intro-3"
        className="section-anchor relative min-h-screen overflow-hidden"
        style={{
          background: "#ede8d1",
        }}
      >
        <div className="grid min-h-screen w-full md:grid-cols-[40%_60%]">
          <div className="relative min-h-[30vh] md:min-h-screen">
            <img
              src={servicesBg2}
              alt="Portrait for Triple One Therapy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex min-h-[50vh] items-center justify-center px-8 py-16 sm:px-12 md:min-h-screen md:px-20">
            <div className="flex max-w-3xl flex-col items-center text-center">
              <h2
                className="scroll-reveal pinyon text-4xl leading-tight text-black sm:text-5xl md:text-6xl mb-15"
                data-reveal
                style={{ fontSize: 38 }}
              >
                Services
              </h2>
              <h3
                className="scroll-reveal mb-10 text-4xl leading-tight sm:text-6xl"
                data-reveal
                style={{
                  color: "#3c3629",
                  fontFamily: "maharlika",
                  fontSize: 28,
                  transitionDelay: "120ms",
                }}
              >
                Individual Psychotherapy $130/50 minutes
              </h3>
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
                I currently accept United Healthcare, Aetna, Cigna, and BCBS. My
                private pay rate is $130/hour, with limited sliding scale spots
                for those enduring financial hardship.
              </p>
              <SimplePracticeBookWidget
                label="Get Started"
                className="scroll-reveal mt-16 inline-flex items-center justify-center border-[3px] border-black px-8 py-3 text-base uppercase tracking-[0.35em] text-black transition hover:bg-black hover:text-[#ede8d1] sm:px-10"
                data-reveal
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
