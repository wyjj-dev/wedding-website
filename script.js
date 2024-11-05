const DOUBLE_TAP_DELAY = 300; // Delay for double-tap zoom prevention
const SCROLL_DELAY = 10; // Delay for scroll to top

let lastTouchEnd = 0;

// Function to prevent zoom on touch events
function handleTouchStart(event) {
    if (event.touches.length > 1) {
        event.preventDefault(); // Prevents pinch-to-zoom
    }
}

// Function to prevent double-tap zoom
function handleTouchEnd(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= DOUBLE_TAP_DELAY) {
        event.preventDefault(); // Prevents double-tap zoom
    }
    lastTouchEnd = now;
}

// Function to scroll to the top of the page
function scrollToTop() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, SCROLL_DELAY);
}

// Event listeners
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchend', handleTouchEnd, { passive: false });
window.addEventListener("load", scrollToTop);





// Loading Screen and Side Bar
// Loading Screen Logic
const FADE_OUT_DELAY = 4000; // Delay before starting fade-out
const HIDE_DELAY = 2000; // Duration for fade-out to complete
const LOADING_SCREEN_ID = 'loading-screen'; // ID for loading screen
const SIDEBAR_CLASS = 'sidebar'; // Class for sidebar
const SIDEBAR_HIDDEN_CLASS = 'sidebar-hidden'; // Class to hide sidebar

function showLoadingScreen(loadingScreen, sidebar) {
    loadingScreen.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    sidebar.classList.add(SIDEBAR_HIDDEN_CLASS); // Hide the sidebar
}

function hideLoadingScreen(loadingScreen) {
    loadingScreen.classList.add('hidden'); // Start fade-out
    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Remove loading screen
        document.body.style.overflow = ''; // Re-enable scrolling
    }, HIDE_DELAY); // Match with the CSS transition duration
}

document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById(LOADING_SCREEN_ID);
    const sidebar = document.querySelector(`.${SIDEBAR_CLASS}`);

    showLoadingScreen(loadingScreen, sidebar); // Show loading screen

    // Wait for all resources to load
    window.onload = function() {
        setTimeout(() => {
            hideLoadingScreen(loadingScreen); // Hide loading screen after delay
            updateActiveSection(); // Update active section
        }, FADE_OUT_DELAY); // Delay before starting fade-out
    };
});


// Sidebar function and update the active section
const DOT_CLASS = '.dot';

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showSidebar() {
    const sidebar = document.querySelector(`.${SIDEBAR_CLASS}`);
    
    sidebar.classList.remove(SIDEBAR_HIDDEN_CLASS); // Ensure it's not hidden
    sidebar.style.opacity = '1'; // Make sidebar visible
    updateActiveSection(); // Update active dot whenever sidebar appears
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Check if section is in viewport
        if (window.scrollY >= sectionTop - sectionHeight / 3 && 
            window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update active dot based on current section
    document.querySelectorAll(DOT_CLASS).forEach(dot => {
        dot.classList.remove('active'); // Remove 'active' class from all dots
        if (dot.getAttribute('href').substring(1) === currentSection) {
            dot.classList.add('active'); // Add 'active' class to the current dot
        }
    });
}

// Event listener for scrolling
document.addEventListener('scroll', debounce(function() {
    const sidebar = document.querySelector(`.${SIDEBAR_CLASS}`);

    // Show the sidebar when scrolling
    sidebar.classList.remove(SIDEBAR_HIDDEN_CLASS); // Ensure it's not hidden
    sidebar.style.opacity = '1'; // Make sidebar visible

    // Update active section as user scrolls
    updateActiveSection();
}, 100)); // Debounce time in milliseconds

// Ensure the sidebar is visible on load
window.addEventListener("load", showSidebar);









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
const SCROLL_TIMEOUT = 1500; // Timeout duration to limit scroll events
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

    // Set initial button text
    languageToggleButton.innerText = 'EN/中文';

    // Add event listener to the language toggle button
    languageToggleButton.addEventListener('click', () => {
        // Toggle the current language
        currentLanguage = currentLanguage === 'english' ? 'chinese' : 'english';

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


let resizeTimeout;

// Function to find the nearest section to scroll to
function scrollToCurrentSection() {
    const sections = document.querySelectorAll('section');
    let currentSection = null;

    // Find the section currently in view
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop >= 0 && sectionTop < window.innerHeight) {
            currentSection = section;
        }
    });

    // Scroll to the top of the current section
    if (currentSection) {
        currentSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Listen for orientation change
// Function to scroll to the current section
function scrollToCurrentSection() {
    const sections = document.querySelectorAll('section'); // Adjust selector based on your structure
    let currentSection = null;

    // Determine the current section based on scroll position
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            currentSection = section;
        }
    });

    // Scroll to the current section if found
    if (currentSection) {
        currentSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Listen for orientation change
window.addEventListener("orientationchange", function() {
    // Clear any previous resize timeout
    clearTimeout(resizeTimeout);
    
    // Use a timeout to allow the layout to adjust
    resizeTimeout = setTimeout(() => {
        scrollToCurrentSection(); // Scroll to the current section
    }, 200); // Adjust the delay as necessary
});

// Handle resize event similarly
window.addEventListener("resize", function() {
    // Clear any previous resize timeout
    clearTimeout(resizeTimeout);
    
    // Use a timeout to allow the layout to adjust
    resizeTimeout = setTimeout(() => {
        scrollToCurrentSection(); // Scroll to the current section
    }, 200); // Adjust the delay as necessary
});

// Optional: Handle scroll event for smoother behavior
window.addEventListener("scroll", function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        scrollToCurrentSection();
    }, 200);
});



