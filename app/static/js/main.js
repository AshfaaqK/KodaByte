document.addEventListener("DOMContentLoaded", function () {
    function createShootingStar() {
        const star = document.createElement("div");
        star.classList.add("star");

        // random starting position (top area of hero)
        star.style.top = Math.random() * window.innerHeight * 0.5 + "px";
        star.style.left = Math.random() * window.innerWidth + "px";

        document.querySelector(".stars").appendChild(star);

        // animate star streaking diagonally
        gsap.fromTo(star,
            { x: 0, y: 0, opacity: 1 },
            {
                x: -400,
                y: 400,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                onComplete: () => star.remove()
            }
        );
    }

    // launch a shooting star every 1–3 seconds
    setInterval(() => {
        if (Math.random() > 0.5) { // 50% chance
            createShootingStar();
        }
    }, 50);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Step 1: Pop in K
    tl.from(".k", {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // Step 2: Slide out "odaByte"
    tl.to(".rest", {
        width: "auto",
        duration: 1,
    }, "+=0.2");

    // Step 3: Push logo up slightly
    tl.to(".logo", {
        y: "-30px",
        duration: 0.5
    }, ">");

    // Step 4: Start typing subtitle after logo animation
    tl.to({}, {
        duration: 0.2,
        onComplete: typeSubtitle
    });

    function typeSubtitle() {
        const subtitleEl = document.getElementById("subtitle-text");
        const cursorEl = document.getElementById("cursor");
        const subtitleText = "Designing responsive, high-performance websites that bring your vision to life online.";
        subtitleEl.textContent = ""; // clear container

        // Show cursor when typing starts
        cursorEl.style.visibility = "visible";

        let index = 0;
        const typingSpeed = 40; // ms per character

        const typeInterval = setInterval(() => {
            subtitleEl.textContent += subtitleText[index];
            index++;
            if (index >= subtitleText.length) clearInterval(typeInterval);
        }, typingSpeed);
    }

    // About section animations

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
