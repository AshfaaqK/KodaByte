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

    gsap.utils.toArray("#about .cloud").forEach((cloud, i) => {
        const depth = (i % 2 === 0) ? 0.6 : 1; // alternate depth by index

        gsap.to(cloud, {
            scrollTrigger: {
                trigger: "#about",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
            x: () => {
                const screenFactor = window.innerWidth < 768 ? 0.5 : 1; // move less on mobile
                return window.innerWidth * depth * screenFactor + 50;
            },
            ease: "none"
        });
    });

});