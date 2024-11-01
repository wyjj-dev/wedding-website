//start from top no matter what

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
});


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

    window.addEventListener('scroll', checkVisibility, { passive: false });

});



//Scoll effect

const sections = document.querySelectorAll('section');
let currentSection = 0;
const MIN_SWIPE_DISTANCE = 50; // Minimum swipe distance in pixels to trigger scrolling

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return; // Prevent out-of-bounds scrolling
    sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    currentSection = index;
}

function handleScroll(event) {
    event.preventDefault(); // Prevent default scrolling behavior

    // Scroll to the next section based on scroll direction
    if (event.deltaY > 0) {
        scrollToSection(currentSection + 1); // Scroll down
    } else {
        scrollToSection(currentSection - 1); // Scroll up
    }
}

// Attach the handleScroll function to the mouse wheel event
window.addEventListener('wheel', handleScroll, { passive: false });

// Touch events for mobile
let touchStartY = 0;

window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY; // Capture the starting touch position
});

window.addEventListener('touchend', (event) => {
    const touchEndY = event.changedTouches[0].clientY; // Capture the ending touch position
    const deltaY = touchEndY - touchStartY; // Calculate the swipe distance

    // Only trigger scrolling if the swipe distance exceeds the minimum
    if (Math.abs(deltaY) > MIN_SWIPE_DISTANCE) {
        if (deltaY < 0) {
            scrollToSection(currentSection + 1); // Swiping up
        } else if (deltaY > 0) {
            scrollToSection(currentSection - 1); // Swiping down
        }
    }
});



//Translate
// Toggle Language for FAQ
let currentLanguage = 'english'; // Default language

document.addEventListener('DOMContentLoaded', function() {
    const languageToggleButton = document.getElementById('languageToggle');

    // Add event listener to the language toggle button
    languageToggleButton.addEventListener('click', () => {
        // Toggle the current language
        currentLanguage = currentLanguage === 'english' ? 'chinese' : 'english';
        // Update button text based on current language
        languageToggleButton.innerText = currentLanguage === 'english' ? '中文' : 'ENG';

        // Call the function to toggle text visibility
        toggleLanguage();
    });

    // Call toggleLanguage on initial load to ensure the correct language is shown
    toggleLanguage();
});

// Function to toggle language visibility in FAQ
function toggleLanguage() {
    // Select all question-answer pairs
    const questions = document.querySelectorAll('.Q-A');

    questions.forEach(question => {
        // Select English and Chinese text divs for questions and answers
        const englishQuestion = question.querySelector('.question-container .english');
        const chineseQuestion = question.querySelector('.question-container .chinese');
        const englishAnswer = question.querySelector('.answer-container .english');
        const chineseAnswer = question.querySelector('.answer-container .chinese');

        // Show or hide text based on current language
        if (currentLanguage === 'english') {
            englishQuestion.style.display = 'block'; // Show English question
            chineseQuestion.style.display = 'none';   // Hide Chinese question
            englishAnswer.style.display = 'block';    // Show English answer
            chineseAnswer.style.display = 'none';      // Hide Chinese answer
        } else {
            englishQuestion.style.display = 'none';   // Hide English question
            chineseQuestion.style.display = 'block';  // Show Chinese question
            englishAnswer.style.display = 'none';     // Hide English answer
            chineseAnswer.style.display = 'block';     // Show Chinese answer
        }
    });
}

// FAQ question answer toggle function
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


