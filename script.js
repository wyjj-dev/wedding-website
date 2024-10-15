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

    // Set a timeout to hide the loading screen after 5 seconds
    setTimeout(() => {
        // Add the hidden class to trigger the fade-out
        loadingScreen.classList.add('hidden');
        
        // Remove the loading screen from the DOM after the fade-out is complete
        setTimeout(() => {
            loadingScreen.style.display = 'none'; // You can also use loadingScreen.remove() to remove it completely
        }, 3000); // Match this duration with the CSS transition duration
    }, 5000); // Show loading screen for 5 seconds
});



