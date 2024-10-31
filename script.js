//Loading Page

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




// fade in page
document.addEventListener("DOMContentLoaded", function () {
    const sections = [document.querySelector('#info'), document.querySelector('#faq')];

    function isInView(element) {
        const sectionPosition = element.getBoundingClientRect();
        return sectionPosition.top < window.innerHeight && sectionPosition.bottom > 0; // Check if the section is in the viewport
    }

    function checkVisibility() {
        sections.forEach(section => {
            if (isInView(section)) {
                section.classList.add('visible'); // Add visible class when in view
            } else {
                section.classList.remove('visible'); // Remove visible class when out of view
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
});



//FAQ question answer

function toggleAnswer(clickedQuestion) {
    // Select all answer containers
    const allAnswers = document.querySelectorAll('.answer-container');
    
    // Toggle only the clicked question's answer
    const answer = clickedQuestion.nextElementSibling;
    
    // Check if the clicked answer is already open
    const isAnswerOpen = answer.style.display === "block";

    // Close all answers first
    allAnswers.forEach(answer => {
        answer.style.display = "none";
    });

    // Open the clicked answer only if it was not open before
    if (!isAnswerOpen) {
        answer.style.display = "block";
    }
}



//Scoll effect

const sections = document.querySelectorAll('section');
let currentSection = 0;
let isScrolling; // Variable to hold the timeout

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return; // Prevent out-of-bounds
    sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    currentSection = index;
}

function handleScroll(event) {
    event.preventDefault(); // Prevent default scrolling

    // Clear the timeout if the user continues to scroll
    clearTimeout(isScrolling);

    // Set a timeout to execute the scroll action after the user stops scrolling
    isScrolling = setTimeout(() => {
        // Check scroll direction
        if (event.deltaY > 0) {
            // Scrolling down
            scrollToSection(currentSection + 1);
        } else {
            // Scrolling up
            scrollToSection(currentSection - 1);
        }
    }, 100); // Adjust this delay for how long to wait after scrolling
}

window.addEventListener('wheel', handleScroll);

// Touch events for mobile
let touchStartY = 0;

window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY; // Get initial touch position
});

window.addEventListener('touchend', (event) => {
    const touchEndY = event.changedTouches[0].clientY; // Get final touch position
    const deltaY = touchEndY - touchStartY; // Calculate the difference

    // Clear the timeout if the user continues to scroll
    clearTimeout(isScrolling);

    // Set a timeout to execute the scroll action after the user stops scrolling
    isScrolling = setTimeout(() => {
        // Check scroll direction
        if (deltaY > 0) {
            // Swiping down
            scrollToSection(currentSection - 1);
        } else if (deltaY < 0) {
            // Swiping up
            scrollToSection(currentSection + 1);
        }
    }, 100); // Adjust this delay for how long to wait after scrolling
});


