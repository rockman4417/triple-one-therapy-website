import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router';
import aboutBg1 from '../assets/backgrounds/about-bg-1.png';
import aboutBg2 from '../assets/backgrounds/about-bg-2.png';
import SimplePracticeBookWidget from '@/components/SimplePracticeBookWidget';

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
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
        className="section-anchor relative min-h-screen overflow-hidden"
        style={{
          background: "#ede8d1",
        }}
      >
        <div className="grid min-h-screen w-full md:grid-cols-[60%_40%]">
          <div className="flex min-h-[50vh] items-center justify-center px-8 py-16 sm:px-12 md:min-h-screen md:px-20">
            <div className="flex max-w-3xl flex-col items-center text-center">
              <h1
                className="scroll-reveal pinyon text-4xl  leading-tight text-black sm:text-5xl md:text-6xl mb-15"
                data-reveal
                style={{ fontSize: 38 }}
              >
                About Your Therapist
              </h1>
              <p
                className="scroll-reveal mb-12 text-4xl leading-tight sm:text-6xl"
                data-reveal
                style={{
                  color: "#3c3629",
                  fontFamily: "maharlika",
                  fontSize: 28,
                  transitionDelay: "120ms",
                }}
              >
                I’m a Licensed Professional Counselor working with people in
                seasons of major transition and self-discovery.
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
                Personally, I’ve lived a life that forced me to constantly adapt
                and exist in survival mode. I had to learn how to keep moving
                through change even when it felt like there was no steady ground
                underneath me. I often felt lost, unsupported and misunderstood,
                and like I was living for others instead of for myself. Those
                experiences and my journey through them is what led me into this
                work that I love so deeply.
              </p>
              <SimplePracticeBookWidget
                label="Get Started"
                className="mt-16 inline-flex items-center justify-center border-[3px] border-black px-8 py-3 text-base uppercase tracking-[0.35em] text-black transition hover:bg-black hover:text-[#ede8d1] sm:px-10"
              />
            </div>
          </div>
          <div className="relative hidden min-h-[30vh] md:block md:min-h-screen">
            <img
              src={aboutBg1}
              alt="Portrait for Triple One Therapy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <section
        id="intro"
        className="section-anchor relative min-h-screen overflow-visible md:overflow-hidden"
        style={{
          background: "#ede8d1",
        }}
      >
        <div className="grid min-h-screen w-full md:grid-cols-[50%_50%]">
          <div className="relative min-h-[30vh] md:block md:min-h-screen">
            <img
              src={aboutBg2}
              alt="Portrait for Triple One Therapy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex min-h-[50vh] items-start justify-center px-8 py-16 sm:px-12 md:min-h-screen md:items-center md:px-20">
            <div className="flex max-w-3xl flex-col items-center text-center">
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
                As a therapist, I’m interested in what shapes us and drives us
                to be our most authentic selves. I am passionate about helping
                people who are grappling with big questions about identity,
                direction, and purpose.
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
                I draw from existential therapy and logotherapy, along with
                eastern perspectives that emphasize inner peace, emotional
                awareness, acceptance, and finding meaning in darkness.
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
                Outside of my work, I value time with my three dogs, my active
                lifestyle, outdoor adventures, travel, film, and creative
                expression. I am always happy to talk about tattoos, tarot, and
                horror movies.
              </p>

              <SimplePracticeBookWidget
                label="Work with me"
                className="mt-16 inline-flex items-center justify-center border-[3px] border-black px-8 py-3 text-base uppercase tracking-[0.35em] text-black transition hover:bg-black hover:text-[#ede8d1] sm:px-10"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
