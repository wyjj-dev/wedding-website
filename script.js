document.addEventListener("DOMContentLoaded", function () {
    const secondSection = document.querySelector('#info');

    function isInView() {
        const sectionPosition = secondSection.getBoundingClientRect();
        return sectionPosition.top <= window.innerHeight; // Check if the top of the section is within the viewport
    }

    function checkVisibility() {
        if (isInView()) {
            secondSection.classList.add('visible'); // Add the 'visible' class to trigger the fade-in
        }
    }

    window.addEventListener('scroll', checkVisibility);
});



document.addEventListener("DOMContentLoaded", function() {
    // Set a timeout to hide the loading screen after 5 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Check if loadingScreen is found before accessing classList
        if (loadingScreen) {
            // Add the hidden class to trigger the fade-out
            loadingScreen.classList.add('hidden');
            
            // Remove the loading screen from the DOM after the fade-out is complete
            setTimeout(() => {
                loadingScreen.style.display = 'none'; // You can also use loadingScreen.remove() to remove it completely
            }, 2000); // Match this duration with the CSS transition duration
        } else {
            console.error("Loading screen not found!");
        }
    }, 5000); // Change this value if you want to adjust the loading time
});


