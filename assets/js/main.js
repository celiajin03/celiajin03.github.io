/**
 * Template Name: iPortfolio
 * Updated: May 30 2023 with Bootstrap v5.3.0
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on click
     */
    let navbarLinks = select('#navbar .nav-link', true);
    const navbarLinksActive = () => {
        navbarLinks.forEach(navbarLink => {
            navbarLink.addEventListener('click', (event) => {
                let activeLink = navbarLink.getAttribute('href');
                if (activeLink) {
                    sessionStorage.setItem('activeLink', activeLink); // Store the active link in sessionStorage
                }
            });
        });
    };

    // Set the active state based on the stored link
    const setActiveLink = () => {
        let activeLink = sessionStorage.getItem('activeLink');
        navbarLinks.forEach(navbarLink => {
            if (navbarLink.getAttribute('href') === activeLink) {
                navbarLink.classList.add('active');
            } else {
                navbarLink.classList.remove('active');
            }
        });
    };

    // Check if it's the first time the page is loaded
    const isFirstTimeLoad = () => {
        let isFirstLoad = sessionStorage.getItem('isFirstLoad');
        if (!isFirstLoad) {
            sessionStorage.setItem('isFirstLoad', 'true');
            return true;
        }
        return false;
    };

    window.addEventListener('load', () => {
        navbarLinksActive();
        if (isFirstTimeLoad()) {
            let activeLink = 'index.html#hero';
            sessionStorage.setItem('activeLink', activeLink); // Set the 'Home' link as active when the page loads for the first time
        }
        setActiveLink();
    });

    
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
        })
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('body').classList.toggle('mobile-nav-active')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Scroll with offset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let body = select('body')
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with offset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Hero type effect
     */
    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function (direction) {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                });
            }
        })
    }

    /**
     * Portfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item'
            });

            let portfolioFilters = select('#portfolio-filters li', true);

            on('click', '#portfolio-filters li', function (e) {
                e.preventDefault();
                portfolioFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                portfolioIsotope.on('arrangeComplete', function () {
                    AOS.refresh()
                });
            }, true);
        }
    });

    /**
     * Initiate portfolio lightbox
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

    /**
     * Initiate Pure Counter
     */
    new PureCounter();

    /**
     * Bonus image display
     */
    const showImage = (imageName) => {
        const imageElement = select('#image');
        imageElement.src = 'assets/img/bonus/' + imageName;
        imageElement.style.display = 'block';
    };

    const hideImage = () => {
        const imageElement = select('#image');
        imageElement.src = '';
        imageElement.style.display = 'none';
    };
    
    const bonus1 = select('#bonus1');
    const bonus2 = select('#bonus2');
    const bonus3 = select('#bonus3');
    const bonus4 = select('#bonus4');

    /**
     * Bonus cursor effects
     */
    const textToCursorMap = {
        bonus1: 'url(assets/img/cursor/drink.png), auto',
        bonus2: 'url(assets/img/cursor/parachute.png), auto',
        bonus3: 'url(assets/img/cursor/map.png), auto',
        bonus4: 'url(assets/img/cursor/pot.png), auto',
        bonus5: 'url(assets/img/cursor/camera.png), auto'
    };

    const setTextCursor = (elementId) => {
        const textElement = select(`#${elementId}`);
        textElement.style.cursor = textToCursorMap[elementId];
    };

    const resetTextCursor = () => {
        const textElements = select('.left p', true);
        textElements.forEach((element) => {
            element.style.cursor = 'default';
        });
    };
    

    bonus1.addEventListener('mouseover', () => {
        setTextCursor('bonus1');
        showImage('cocktail.jpg');
    });

    bonus2.addEventListener('mouseover', () => {
        setTextCursor('bonus2');
        showImage('skydiv.jpg');
    });

    bonus3.addEventListener('mouseover', () => {
        setTextCursor('bonus3');
        showImage('travel.jpg');
    });

    bonus4.addEventListener('mouseover', () => {
        setTextCursor('bonus4');
        showImage('cook.jpg');
    });

    /**
     * Bonus image slider
     */
    const bonus5 = select("#bonus5");
    const testimonials = select("#testimonials");
    let swiper;

    bonus5.addEventListener("mouseenter", () => {
        setTextCursor('bonus5');
        testimonials.style.display = "block";

        swiper = new Swiper('.testimonials-slider', {
            speed: 1000,
            loop: true,
            loopAdditionalSlides: 1,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                1200: {
                    slidesPerView: 1,
                    spaceBetween: 20
                }
            }
        });
    });

    bonus5.addEventListener("mouseleave", () => {
        testimonials.style.display = "none";
    });

    const leftText = select('.left');
    leftText.addEventListener('mouseout', () => {
        resetTextCursor();
        hideImage();
    });
    
})()

