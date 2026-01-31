
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

    gsap.to({}, 0.016, {
        repeat: -1,
        onRepeat: function() {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;
            
            gsap.set(follower, {
                css: {
                    left: posX - 20,
                    top: posY - 20
                }
            });
            
            gsap.set(cursor, {
                css: {
                    left: mouseX - 8,
                    top: mouseY - 8
                }
            });
        }
    });

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hover effects for links/buttons
    const links = document.querySelectorAll('a, button, .project-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('scale-150');
            follower.classList.add('scale-150');
            gsap.to(cursor, { scale: 0, duration: 0.3 });
            gsap.to(follower, { scale: 1.5, borderColor: '#64ffda', duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('scale-150');
            follower.classList.remove('scale-150');
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, { scale: 1, borderColor: '#fff', duration: 0.3 });
        });
    });

    // --- 2. Loader ---
    let counter = 0;
    const counterElement = document.querySelector('.counter');
    const loaderBar = document.querySelector('.loader-bar');
    const loader = document.querySelector('.loader');

    function updateLoader() {
        if(counter === 100) {
            gsap.to(loader, {
                y: '-100%',
                duration: 1,
                ease: 'power4.inOut',
                onComplete: initSite
            });
            return;
        }

        counter += Math.floor(Math.random() * 10) + 1;
        if(counter > 100) counter = 100;

        counterElement.innerText = counter + '%';
        loaderBar.style.width = counter + '%';

        let delay = Math.floor(Math.random() * 200) + 50;
        setTimeout(updateLoader, delay);
    }
    
    updateLoader();

    function initSite() {
        initLocomotiveScroll();
        initThreeJS();
        initAnimations();
    }

    // --- 3. Locomotive Scroll + ScrollTrigger ---
    let scroller; 
    
    function initLocomotiveScroll() {
        gsap.registerPlugin(ScrollTrigger);

        const scrollContainer = document.querySelector('[data-scroll-container]');

        scroller = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            getDirection: true,
            smartphone: { smooth: true },
            tablet: { smooth: true }
        });

        // syncing ScrollTrigger with Locomotive Scroll
        scroller.on('scroll', ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(scrollContainer, {
            scrollTop(value) {
                return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            pinType: scrollContainer.style.transform ? "transform" : "fixed"
        });

        ScrollTrigger.addEventListener('refresh', () => scroller.update());
        ScrollTrigger.refresh();
    }

    // --- 4. Animations ---
    function initAnimations() {
        // Hero Reveal
        const tl = gsap.timeline();
        tl.to('.hero-text', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
          .to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.5")
          .to('.hero-sub', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.5")
          .to('.nav-animate', { opacity: 1, duration: 1 }, "-=0.5")
          .to('.hero-scroll', { opacity: 1, duration: 1 }, "-=0.5");

        // Horizontal Scroll (Desktop Only)
        if(window.innerWidth > 768) {
            const sections = gsap.utils.toArray(".pin-wrap > *");
            const pinWrap = document.querySelector(".pin-wrap");
            const pinWrapWidth = pinWrap.offsetWidth;
            const horizontalScrollLength = pinWrapWidth - window.innerWidth;
            
            // Adjust calculation for better fit
            gsap.to(".pin-wrap", {
                x: -horizontalScrollLength, 
                ease: "none",
                scrollTrigger: {
                    trigger: ".project-wrapper",
                    scroller: "[data-scroll-container]",
                    pin: true,
                    scrub: 1,
                    // start: "top top",
                    end: () => "+=" + pinWrapWidth, // control speed
                    invalidateOnRefresh: true
                }
            });
        }
        
        // Text Reveals
        gsap.utils.toArray('.reveal-text').forEach(section => {
             gsap.from(section, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    scroller: "[data-scroll-container]",
                    start: "top 80%",
                }
             });
        });

        // Refresh specifically for Locomotive
        ScrollTrigger.refresh();
    }

    // --- 5. Three.js Hero Background ---
    function initThreeJS() {
        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Particles
        const geometry = new THREE.BufferGeometry();
        const particlesCount = 700;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            // spread particles across a wide area
            posArray[i] = (Math.random() - 0.5) * 15; 
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const material = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x64ffda,
            transparent: true,
            opacity: 0.8
        });

        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);

        camera.position.z = 2;

        // Interaction
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        });

        // Animation Loop
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            particlesMesh.rotation.y = elapsedTime * 0.05;
            particlesMesh.rotation.x = mouseY * 0.5;
            particlesMesh.rotation.y += mouseX * 0.5;

            renderer.render(scene, camera);
        }

        animate();

        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

});
