import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Logo() {
  const animationInProgress = useRef(false);

  useGSAP(() => {
    const t1 = gsap.timeline();
    function enterAnimation() {
      t1.to(".car-logo", {
        top: 280,
        left: "-140vw",
        duration: 0.4,
        ease: "power2.in",
      });
      t1.to(
        [".text-logo"],
        {
          left: "120vw",
          duration: 0.2,
          ease: "power2.in", // Efeito de animação
        },
        "-=0.2"
      )
        .to(".hd-lg", {
          height: "300px",
          duration: 0.01,
        })
        .to(".complete-logo", {
          width: "140px",
          top: 0,
          position: "fixed",
          justifyContent: "unset",
          duration: 0.01,
        })
        .set(".car-logo", {
          left: "400px",
          top: "-200px",
          width: "60%",
          paddingTop: "40%",
          duration: 0.01,
          backgroundColor: "inherit",
        })
        .set(".text-logo > div:nth-child(1)", {
          textAlign: "left",
          duration: 0.01,
        })
        .set(".text-logo", {
          left: "-250px",
          top: "38px",
          duration: 0.01,
        })
        .to(".text-logo", {
          left: "12px",
          top: "38px",
          duration: 0.2,

          ease: "power2.out",
        })
        .to(
          ".car-logo",
          {
            left: "12px",
            top: "0",
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        );

      t1.eventCallback("onComplete", () => {
        animationInProgress.current = false;
      });
    }

    // car-logo
    function exitAnimation() {
      t1.to(".text-logo", {
        left: "-100px",
        duration: 0.1,
        ease: "power2.in",
      })
        .to(".car-logo", {
          left: "-400px",
          top: "200px",
          duration: 0.1,
          ease: "power2.in",
        })
        .set(".hd-lg", {
          height: "inherit",
          duration: 0.01,
        })
        .set(".text-logo > div:nth-child(1)", {
          textAlign: "right",
          duration: 0.01,
        })
        .set(".complete-logo", {
          width: "300px",
          position: "relative",
          justifyContent: "center",
          duration: 0.01,
        })
        .set(".text-logo", {
          left: "120vw",
          top: "24%",
          duration: 0.01,
          ease: "power2.in",
        })
        .set(".car-logo", {
          width: "100%",
          paddingTop: "100%",
          top: "-280px",
          left: "500px",
          duration: 0.01,
          ease: "power2.in",
        })
        .to(".text-logo", {
          top: "64%",
          left: "63%",
          duration: 0.2,
          ease: "power2.out",
        })
        .to(
          ".car-logo",
          {
            left: "0",
            top: "0",
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        );
      t1.eventCallback("onComplete", () => {
        animationInProgress.current = false;
      });
    }
    let animated = false;
    var lastScroll = 0;
    const handleScroll = (e) => {
      const codesElement = document.querySelector(".codes");
      const { top } = codesElement.getBoundingClientRect();
      var st = document.documentElement.scrollTop;
      if (st > lastScroll && top < 200 && !animated) {
        animationInProgress.current = true;
        enterAnimation();
        animated = true;
        // setAnimated(true); // O elemento está na viewport
      } else if (st < lastScroll && animated && top > 200) {
        animationInProgress.current = true;
        exitAnimation(); // O elemento não está na viewport
        animated = false;
      }
      lastScroll = st <= 0 ? 0 : st;
    };

    // Adicionar o ouvinte de rolagem
    window.addEventListener("scroll", (e) => handleScroll(e));

    return () => {
      // Limpar o ouvinte ao desmontar o componente
      window.removeEventListener("scroll", (e) => handleScroll(e));
    };
  }, []);

  return (
    <header className="hd-lg">
      <div className="complete-logo ">
        <div className="car-logo">
          <img src="/car/car.png" />

          <img src="/car/stroke.png" />
        </div>
        <div className="text-logo">
          <div>JS</div>
          <div>BENCHMARK</div>
        </div>
      </div>
    </header>
  );
}

export default Logo;
