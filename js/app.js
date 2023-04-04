let controller;
let slideScene;
let newScene;

function animateSlide() {
  controller = new ScrollMagic.Controller();

  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  sliders.forEach((slide, index, slides) => {
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
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(sliderTl)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })
      .addTo(controller);
    const pageTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    newScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      duration: "100%",
    })
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "page",
        indent: 200,
      })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}
let mouse = document.querySelector(".cursor");
let mouseTxt = mouse.querySelector("span");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    mouseTxt.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
  }
}
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

animateSlide();
