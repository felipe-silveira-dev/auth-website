// Add your javascript here

import * as htmx from "htmx.org";
window.htmx = htmx;
import './htmx-loading-states';
import './alpine-morph';
import hljs from 'highlight.js';
import Alpine from 'alpinejs'
import morph from '@alpinejs/morph'
import focus from '@alpinejs/focus'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);
 
window.Alpine = Alpine
Alpine.plugin(morph)
Alpine.plugin(focus)

Alpine.start()
domReadyLoop();

document.addEventListener("DOMContentLoaded", function() {

    console.log('what');
    loadGsapAnimations();
    createRadialBackgrounds();
    updateTOC();
    addHeadingsToTOC();
    renderSmoothAnchorLinks();
    window.dispatchEvent(new CustomEvent('set-route', { detail: { route: window.location.pathname } }));
    removeHTMXloadingStates();
    
    changeDocsContentMobile();
    // if (typeof document.startViewTransition === "function") {
    //     document.startViewTransition(() => updateTheDOMSomehow(data));
    // }
    
    
});

removeHTMXloadingStates = function(){
    const loadingElements = document.querySelectorAll('[data-loading]');
    console.log('accessed here');
    loadingElements.forEach(element => {
        
        element.style.display = 'none';
    });
}

changeDocsContentMobile = function(){
    document.querySelectorAll('[hx-target="#docs-content"]').forEach(element => {
        element.addEventListener('click', function(){
            if (window.innerWidth < 768 && (window.location.href == document.getElementById('home_url').value || window.location.pathname.replace(/^\/|\/$/g, '') == document.getElementById('home_url').value.replace(/^\/|\/$/g, ''))  ) {
                window.location.href = element.getAttribute('hx-get');
            }
        });
    });
}

window.onbeforeunload = function(){
    console.log('go');
  };

function loadGsapAnimations(){

    if(document.getElementById('hero')){
        gsap.to("#hero", {
            scrollTrigger: {
                trigger: "#features",
                start: "top 100%",
                end: "top 10%",
                scrub: true
            },
            opacity: 0
        });
        gsap.fromTo("#hero-main img.bounce-image", {
            scale: 0.8
        }, {
            scale: 1,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut"
        });
    }

    if(document.getElementById('features')){
        gsap.set("#features", {
            opacity: 0
        });
        gsap.to("#features", {
            scrollTrigger: {
                trigger: "#features-header",
                start: "top 80%",
                end: "bottom 60%",
                scrub: true,
            },
            y: -150,
            opacity: 1
        });
    }

    if(document.getElementById('radical')){
        gsap.to("#radical", {
            scrollTrigger: {
                trigger: "#features-header",
                start: "top 80%",
                end: "bottom 50%",
                scrub: true
            },
            x: -50,
            opacity: 1
        });
    }

    if(document.getElementById('how-to-use-it')){
        gsap.to("#how-to-use-it", {
            scrollTrigger: {
                trigger: "#features",
                start: "bottom 90%",
                end: "bottom 20%",
                scrub: true
            },
            y: -150,
            opacity: 1
        });
    }

    if(document.getElementById('include-code')){
        gsap.to("#include-code", {
            scrollTrigger: {
                trigger: "#include-section",
                start: "top bottom",
                end: "bottom 80%",
                scrub: true,
                debug: true
            },
            y: 0,
            opacity: 1
        });
    }

    if(document.getElementById('include-code')){
        gsap.to("#include-code-box", {
            scrollTrigger: {
                trigger: "#include-section",
                start: "top bottom",
                end: "bottom 50%",
                scrub: true
            },
            opacity: 1,
            y: 0,
            opacity: 1
        });
    }

    if(document.getElementById('tailwind-code-box')){
        gsap.to("#tailwind-code-box", {
            scrollTrigger: {
                trigger: "#tailwind-section",
                start: "top bottom",
                end: "bottom 50%",
                scrub: true,
                debug: true
            },
            scale: 1,
            y: 0
        });
    }

    if(document.getElementById('tailwind-code')){
        gsap.to("#tailwind-code", {
            scrollTrigger: {
                trigger: "#tailwind-section",
                start: "top bottom",
                end: "bottom 50%",
                scrub: true,
                debug: true
            },
            opacity: 1
        });
    }

    if(document.getElementById('page-code-box')){
        gsap.to("#page-code-box", {
            scrollTrigger: {
                trigger: "#page-section",
                start: "top bottom",
                end: "bottom 50%",
                scrub: true,
                debug: true
            },
            y: 0
        });
    }

    if(document.getElementById('layout-code-box-1')){
        gsap.to("#layout-code-box-1", {
            scrollTrigger: {
                trigger: "#layout-section",
                start: "top bottom",
                end: "bottom 50%",
                scrub: true
            },
            opacity: 1,
            y: 0,
            opacity: 1
        });
    }

    if(document.getElementById('layout-code-box-2')){
        gsap.to("#layout-code-box-2", {
            scrollTrigger: {
                trigger: "#layout-section",
                start: "top bottom",
                end: "bottom 50%",
                scrub: true
            },
            opacity: 1,
            y: 0,
            opacity: 1
        });
    }

    if(document.getElementById('layout-text')){
        gsap.to("#layout-text", {
            scrollTrigger: {
                trigger: "#layout-section",
                start: "top bottom",
                end: "bottom 50%",
                scrub: true
            },
            opacity: 1,
            y: 0,
            opacity: 1
        });
    }

    if(document.getElementById('content-code-box')){
        gsap.to("#content-code-box", {
            scrollTrigger: {
                trigger: "#content-section",
                start: "top bottom",
                end: "bottom 50%",
                scrub: true,
                debug: true
            },
            scale: 1,
            y: 0
        });
    }

    if(document.getElementById('reload-code-box')){
        gsap.to("#reload-code-box", {
            scrollTrigger: {
                trigger: "#reload-section",
                start: "top bottom",
                end: "bottom 50%",
                scrub: true,
                debug: true
            },
            scale: 1,
            y: 0
        });
    }
}

function createRadialBackgrounds(){
    let radialElements = document.querySelectorAll('.radial-background');
    for (let i = 0; i < radialElements.length; i++) {
        radialElements[i].style.backgroundImage = `radial-gradient(circle at 0px 0px, rgba(32, 32, 42, 0.9) 0%, rgba(215, 215, 255, 0.01) 85%, transparent 100%)`;
    }
    window.addEventListener('mousemove', function(event) {
        if (event.target.classList.contains('radial-background') || event.target.closest('.radial-background')) {
            let element = event.target.classList.contains('radial-background') ? event.target : event.target.closest('.radial-background');
            let {
                clientX,
                clientY
            } = event;
            const rect = element.getBoundingClientRect();
            clientX = clientX - rect.left;
            clientY = clientY - rect.top;
            element.style.backgroundImage = `radial-gradient(circle at ${clientX}px ${clientY}px, rgba(32, 32, 42, 0.9) 0%, rgba(215, 215, 255, 0.01) 85%, transparent 100%)`;
        }
    });
}

window.scrollTop = function(){
    setTimeout(function(){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, 20);
}

function domReadyLoop(){
    if(document.getElementById('loader')){
        let intervalCount = 0;
        let maxIntervalCount = 10; // -> 10*500ms = 5s max
        let domReadyInterval = setInterval(function(){
            if(document.readyState === 'complete' || intervalCount++ > maxIntervalCount){
                clearInterval(domReadyInterval);
                document.getElementById('loader').classList.add('opacity-0');
                setTimeout(function(){
                    document.getElementById('loader').remove();
                }, 300);
            }       
        }, 500);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    hljs.highlightAll();
});

document.addEventListener('htmx:afterSwap', function(evt) {
    setTimeout(function(){
        domReadyLoop();
        hljs.highlightAll();
        loadGsapAnimations();
        createRadialBackgrounds();
        window.dispatchEvent(new CustomEvent('set-route', { detail: { route: evt.detail.pathInfo.requestPath } }));
//        updateTOC();
    }, 10);
});

document.addEventListener('htmx:afterSettle', function(evt) {
    setTimeout(function(){
        updateTOC();
        addHeadingsToTOC();
        renderSmoothAnchorLinks();

        confirmIntroInstallLinks();
    }, 10);
});


function confirmIntroInstallLinks(){
    if(window.location.href.includes('docs/install')){
        document.getElementById('installation-docs').dispatchEvent(new CustomEvent('set-active', {}));
    } else {
        document.getElementById('installation-docs').dispatchEvent(new CustomEvent('set-inactive', {}));
    }

    if(window.location.href.includes('docs/getting-started')){
        document.getElementById('introduction-docs').dispatchEvent(new CustomEvent('set-active', {}));
    } else {
        document.getElementById('introduction-docs').dispatchEvent(new CustomEvent('set-inactive', {}));
    }
    
    
}


function updateTOC(){
    if(document.getElementById('table-of-contents')){
        setTimeout(function(){
            console.log('setting...');
            window.dispatchEvent(new CustomEvent('set-toc', { detail: { toc: JSON.parse(document.getElementById('static-content').dataset.toc) } }));
        });
    }    
}

window.addHeadingsToTOC = function(){
    const headings = document.querySelectorAll(".prose h2, .prose h3, .prose h4");
    
    headings.forEach(heading => {
        const anchor = document.createElement("a");
        anchor.href = `#${heading.id}`;
        anchor.textContent = "# ";

        heading.insertAdjacentElement("afterbegin", anchor);
    });
}

window.renderSmoothAnchorLinks = function(){
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const offset = 20; // Adjust the offset value as per your requirement
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

window.renderTocFunctionality = function(){
    const tocALinks = document.querySelectorAll('.toc li a');

    tocALinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const offset = 20; // Adjust the offset value as per your requirement
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Get all the <a> elements inside the table of contents
    const tocLinks = document.querySelectorAll('.toc li');

    // Add an event listener to the window scroll event
    window.addEventListener('scroll', () => {
        // Get the current scroll position
        const scrollPosition = window.scrollY;

        // Loop through each table of contents link
        tocLinks.forEach(link => {
            // Get the target element ID from the link's href attribute
            const targetId = link.firstElementChild.getAttribute('href').substring(1);

            // Get the target element by ID
            const targetElement = document.getElementById(targetId);

            

            // Check if the target element exists and is in the viewport
            if (targetElement && isElementAtTopAndNotReachedNextSection(targetElement)) {
                if(!link.classList.contains('active')){
                    // Add the 'active' class to the link
                    link.classList.add('active');
                    setAllOthersToInactive(link);
                }
            }
        });
    });
}

// Helper function to check if an element is in the viewport
function isElementAtTopAndNotReachedNextSection(element) {
    const rect = element.getBoundingClientRect();
    const nextSection = document.querySelector('section + section');

    return (
        rect.top <= 100 &&
        (!nextSection || rect.bottom < (nextSection.offsetTop +100))
    );
}

function setAllOthersToInactive(link){
    const tocLinks = document.querySelectorAll('.toc li');
    for(let i = 0; i < tocLinks.length; i++){
        if(tocLinks[i] != link){
            if(tocLinks[i].classList){
                tocLinks[i].classList.remove('active');
            }
        }
    }
}

