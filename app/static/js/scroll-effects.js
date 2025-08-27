document.addEventListener("DOMContentLoaded", function () {
    // =========================
    // BACKGROUND GRADIENT SCROLL
    // =========================
    gsap.registerPlugin(ScrollTrigger);

    const gradients = [
        "linear-gradient(135deg, #0e152e 0%, #11265f 50%, #0e152e 100%)", // Hero: space
        "linear-gradient(135deg, #0e152e 0%, #3a6db3 100%)",              // About: upper atmosphere
        "linear-gradient(135deg, #3a6db3 0%, #87CEEB 100%)",              // Portfolio: sky blue
        "linear-gradient(135deg, #87CEEB 0%, #87CEEB 100%)"               // Services: clouds
    ];

    gradients.forEach((bg, i) => {
        ScrollTrigger.create({
            trigger: document.querySelectorAll(".panel")[i],
            start: "top center",
            end: "bottom center",
            onEnter: () => gsap.to("body", { background: bg, duration: 1.5 }),
            onEnterBack: () => gsap.to("body", { background: bg, duration: 1.5 })
        });
    });
});