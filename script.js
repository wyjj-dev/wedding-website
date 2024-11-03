document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault(); // Prevents pinch-to-zoom
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault(); // Prevents double-tap zoom
    }
    lastTouchEnd = now;
}, { passive: false });



// Scroll to Top on Page Load or Refresh
window.addEventListener("load", function() {
    window.scrollTo(0, 0); // Instantly scroll to top on page load
});

// Loading Screen Logic
// Loading Screen Logic
document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loading-screen');
    const sidebar = document.querySelector('.sidebar');

    // Add the visible class to start the fade-in effect
    loadingScreen.classList.add('visible');

    // Prevent scrolling while the loading screen is visible
    document.body.style.overflow = 'hidden';

    // Initially hide the sidebar to ensure it does not show during loading
    sidebar.classList.add('sidebar-hidden');
    
    // Wait for all resources to load
    window.onload = function() {
        // Start fade-out process after a delay
        setTimeout(() => {
            // Add the hidden class to start fade-out
            loadingScreen.classList.add('hidden');
            
            // After fade-out, remove loading screen, re-enable scrolling, and show sidebar
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = ''; // Re-enable scrolling

                // Show sidebar for 5 seconds
                showSidebarForDuration(5000); // Show sidebar for 5 seconds
                updateActiveSection(); // Immediately update active section after loading screen disappears
            }, 2000); // Match this with the CSS transition duration
        }, 4000); // Optional delay before starting fade-out
    };
});

// Function to show the sidebar with fade in/out effect
let sidebarTimeout;

function showSidebarForDuration(duration) {
    const sidebar = document.querySelector('.sidebar');
    
    sidebar.classList.remove('sidebar-hidden'); // Ensure it's not hidden
    sidebar.style.opacity = '1'; // Make sidebar visible
    updateActiveSection(); // Update active dot whenever sidebar appears

    // Clear the previous timeout if scroll event is detected again
    clearTimeout(sidebarTimeout);

    // Set a timeout to hide the sidebar after the specified duration
    sidebarTimeout = setTimeout(() => {
        sidebar.style.opacity = '0'; // Fade out the sidebar

        // After fading out, set display to none
        setTimeout(() => {
            sidebar.classList.add('sidebar-hidden'); // Hide the sidebar after fading out
        }, 500); // Match this with the CSS transition duration
    }, duration); // Use the passed duration (5000 milliseconds = 5 seconds)
}

// Function to detect the current section in view
function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Check if section is in viewport
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update active dot based on current section
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active'); // Remove 'active' class from all dots
        if (dot.getAttribute('href').substring(1) === currentSection) {
            dot.classList.add('active'); // Add 'active' class to the current dot
        }
    });
}

// Event listener for scrolling
document.addEventListener('scroll', function() {
    const sidebar = document.querySelector('.sidebar');

    // Show the sidebar when scrolling
    sidebar.classList.remove('sidebar-hidden'); // Ensure it's not hidden
    sidebar.style.opacity = '1'; // Make sidebar visible

    // Clear the previous timeout if scroll event is detected again
    clearTimeout(sidebarTimeout);

    // Update active section as user scrolls
    updateActiveSection();

    // Set a timeout to hide the sidebar after 5 seconds of no scrolling
    sidebarTimeout = setTimeout(() => {
        sidebar.style.opacity = '0'; // Fade out the sidebar

        // After fading out, set display to none
        setTimeout(() => {
            sidebar.classList.add('sidebar-hidden'); // Hide the sidebar after fading out
        }, 200); // Match this with the CSS transition duration
    }, 2000); // 5000 milliseconds = 5 seconds
});







// fade in page
document.addEventListener("DOMContentLoaded", function () {
    const sections = [document.querySelector('#intro'), document.querySelector('#info'), document.querySelector('#faq')];

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

    // Initial visibility check
    checkVisibility(); // Ensure the first page is visible on load

    window.addEventListener('scroll', checkVisibility, { passive: false });
});




// Scroll effect

const sections = document.querySelectorAll('section');
let currentSection = 0;
const MIN_SWIPE_DISTANCE = 100; // Minimum swipe distance in pixels to trigger scrolling
const SCROLL_TIMEOUT = 600; // Timeout duration to limit scroll events
let isScrolling = false; // Flag to prevent multiple scrolls

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return; // Prevent out-of-bounds scrolling
    sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    currentSection = index; // Update the current section index
}

function handleScroll(event) {
    event.preventDefault(); // Prevent default scrolling behavior

    // Prevent multiple scroll actions if already scrolling
    if (isScrolling) return;

    isScrolling = true; // Set scrolling flag

    // Scroll to the next section based on scroll direction
    if (event.deltaY > 0) {
        scrollToSection(currentSection + 1); // Scroll down
    } else {
        scrollToSection(currentSection - 1); // Scroll up
    }

    // Reset isScrolling after a timeout
    setTimeout(() => {
        isScrolling = false; // Allow scrolling again after the timeout
    }, SCROLL_TIMEOUT);
}

// Attach the handleScroll function to the mouse wheel event
window.addEventListener('wheel', handleScroll, { passive: false });

// Touch events for mobile
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY; // Capture the starting touch position
});

window.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].clientY; // Capture the ending touch position
    const deltaY = touchEndY - touchStartY; // Calculate the swipe distance

    // Only trigger scrolling if the swipe distance exceeds the minimum
    if (Math.abs(deltaY) > MIN_SWIPE_DISTANCE) {
        // Determine the swipe direction and scroll accordingly
        if (deltaY < 0) {
            scrollToSection(currentSection + 1); // Swiping up
        } else if (deltaY > 0) {
            scrollToSection(currentSection - 1); // Swiping down
        }
    }
});

// Optional: Prevent default behavior for touch events to avoid scrolling in the browser
window.addEventListener('touchmove', (event) => {
    event.preventDefault();
}, { passive: false });



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


