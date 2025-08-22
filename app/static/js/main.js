document.addEventListener("DOMContentLoaded", function () {
    // Generate static stars
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

            // Twinkle effect
            gsap.to(star, {
                opacity: Math.random(),
                duration: Math.random() * 2 + 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 2
            });

            // Parallax drift (tiny movement loop)
            gsap.to(star, {
                x: "+=" + (Math.random() * 20 - 10), // drift left or right
                y: "+=" + (Math.random() * 20 - 10), // drift up or down
                duration: Math.random() * 10 + 15,   // very slow
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }


    // Shooting stars
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

    // Init
    createStarfield(120);

    // Shooting stars randomly
    setInterval(() => {
        if (Math.random() > 0.2) { // 80% chance per second
            createShootingStar();
        }
    }, 150);


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
