document.addEventListener("DOMContentLoaded", function () {
    // =========================
    // ABOUT SECTION ANIMATIONS
    // =========================
    gsap.from(".about-image img", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
        },
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });

    // Count-up stats (Years + Projects)
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        let target = +counter.dataset.target;
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => {
                gsap.fromTo(counter, { innerText: 0 }, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 }
                });
            }
        });
    });

    // Star rating
    gsap.to(".stars i", {
        scrollTrigger: {
            trigger: ".stars",
            start: "top 80%",
        },
        opacity: 100,
        scale: 0.7,
        duration: 0.7,
        stagger: 0.3,
        ease: "back.out(1.7)"
    });
});