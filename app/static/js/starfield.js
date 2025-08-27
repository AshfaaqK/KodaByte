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
});