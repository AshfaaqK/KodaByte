document.addEventListener("DOMContentLoaded", function () {
    // =========================
    // STARFIELD + SHOOTING STARS
    // =========================
    function createStarfield(numStars = 120) {
        const container = document.querySelector(".starfield");
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement("div");
            star.classList.add("star");

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            star.style.top = y + "px";
            star.style.left = x + "px";
            container.appendChild(star);

            // Twinkle
            gsap.to(star, {
                opacity: Math.random(),
                duration: Math.random() * 2 + 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 2
            });

            // Parallax drift
            gsap.to(star, {
                x: "+=" + (Math.random() * 20 - 10),
                y: "+=" + (Math.random() * 20 - 10),
                duration: Math.random() * 10 + 15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }

    function createShootingStar() {
        const star = document.createElement("div");
        star.classList.add("shooting-star");
        star.style.top = Math.random() * window.innerHeight * 0.5 + "px";
        star.style.left = Math.random() * window.innerWidth + "px";
        document.querySelector(".shooting-stars").appendChild(star);

        gsap.fromTo(star,
            { x: 0, y: 0, opacity: 1 },
            {
                x: -400, y: 400, opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                onComplete: () => star.remove()
            }
        );
    }

    // Init starfield
    createStarfield(120);

    // Shooting stars
    setInterval(() => {
        if (Math.random() > 0.2) { // 80% chance per second
            createShootingStar();
        }
    }, 150);

    // =========================
    // HERO LOGO + SUBTITLE
    // =========================
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Pop in K
    tl.from(".k", {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // Slide out "odaByte"
    tl.to(".rest", {
        width: "auto",
        duration: 1,
    }, "+=0.2");

    // Push logo up slightly
    tl.to(".logo", {
        y: "-30px",
        duration: 0.5
    }, ">");

    // Start typing subtitle
    tl.to({}, {
        duration: 0.2,
        onComplete: typeSubtitle
    });

    function typeSubtitle() {
        const subtitleEl = document.getElementById("subtitle-text");
        const cursorEl = document.getElementById("cursor");
        const subtitleText = "Designing responsive, high-performance websites that bring your vision to life online.";
        subtitleEl.textContent = "";
        cursorEl.style.visibility = "visible";

        let index = 0;
        const typingSpeed = 40;

        const typeInterval = setInterval(() => {
            subtitleEl.textContent += subtitleText[index];
            index++;
            if (index >= subtitleText.length) clearInterval(typeInterval);
        }, typingSpeed);
    }

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
