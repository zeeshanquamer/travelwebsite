let controller;
let slideScene;

function animateSlide() {
  controller = new ScrollMagic.Controller();

  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  sliders.forEach((slide) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    const sliderTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    sliderTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    sliderTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    sliderTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    sliderTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=1");
    // gsap.to(revealImg, 1, { x: "100%" });
    // gsap.to(revealText, 1, { x: "100%" });
  });
}
animateSlide();
