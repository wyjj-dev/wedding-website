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
    const loadingScreen = document.getElementById('loading-screen');

    // Add the visible class to start the fade-in effect
    loadingScreen.classList.add('visible');

    // Wait for the window load event (which ensures all images, fonts, etc., are loaded)
    window.onload = function() {
        // Once everything is loaded, wait for 1 second, then fade out the loading screen
        setTimeout(() => {
            // Add the hidden class to trigger the fade-out effect
            loadingScreen.classList.add('hidden');
            
            // After the fade-out animation is done, remove the loading screen from the DOM
            setTimeout(() => {
                loadingScreen.style.display = 'none'; // Or loadingScreen.remove() to remove it entirely
            }, 2000); // Match this duration with the CSS transition duration
        }, 4000); // Optional delay before starting fade-out
    };
});



