const SCROLL_DELAY = 10;

function handleTouchStart(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}
function scrollToTop() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, SCROLL_DELAY);
}

document.addEventListener('touchstart', handleTouchStart, { passive: false });
window.addEventListener("load", scrollToTop);


// Loading Screen
const FADE_OUT_DELAY = 4000;
const HIDE_DELAY = 2000;
const SIDEBAR_CLASS = 'sidebar';
const SIDEBAR_HIDDEN_CLASS = 'sidebar-hidden';

function showLoadingScreen(loadingScreen, sidebar) {
    loadingScreen.classList.add('visible');
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    isScrolling = true;
    sidebar.classList.add(SIDEBAR_HIDDEN_CLASS);
}

function hideLoadingScreen(loadingScreen) {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        isScrolling = false;
    }, HIDE_DELAY);
}

document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById('loading-screen');
    const sidebar = document.querySelector(`.${SIDEBAR_CLASS}`);

    showLoadingScreen(loadingScreen, sidebar);

    window.onload = function () {
        setTimeout(() => {
            hideLoadingScreen(loadingScreen);
            updateActiveSection();
        }, FADE_OUT_DELAY);
    };
});


// Sidebar
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
    sidebar.classList.remove(SIDEBAR_HIDDEN_CLASS);
    sidebar.style.opacity = '1';
    updateActiveSection();
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    let activeSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3 &&
            window.scrollY < sectionTop + sectionHeight) {
            activeSectionId = section.getAttribute('id');
        }
    });

    document.querySelectorAll(DOT_CLASS).forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('href').substring(1) === activeSectionId) {
            dot.classList.add('active');
        }
    });
}

document.addEventListener('scroll', debounce(function () {
    const sidebar = document.querySelector(`.${SIDEBAR_CLASS}`);
    sidebar.classList.remove(SIDEBAR_HIDDEN_CLASS);
    sidebar.style.opacity = '1';
    updateActiveSection();
}, 100));

window.addEventListener("load", showSidebar);

document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSection = index;
    });
});


// Fade in pages
document.addEventListener("DOMContentLoaded", function () {
    const sections = [document.querySelector('#intro'), document.querySelector('#info'), document.querySelector('#faq')];

    function isInView(element) {
        const sectionPosition = element.getBoundingClientRect();
        return sectionPosition.top < window.innerHeight && sectionPosition.bottom > 0;
    }

    function checkVisibility() {
        sections.forEach(section => {
            if (isInView(section)) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: false });
});


// Scroll effect
const sections = document.querySelectorAll('section');
let currentSection = 0;
const MIN_SWIPE_DISTANCE = 100;
const SCROLL_TIMEOUT = 1500;
let isScrolling = false;
let popupOpen = false;

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    currentSection = index;
}

function handleScroll(event) {
    const answer = event.target.closest('.answer-container');
    if (answer && answer.scrollHeight > answer.clientHeight) {
        return;
    }

    event.preventDefault();
    if (isScrolling || popupOpen) return;
    isScrolling = true;

    if (event.deltaY > 0) {
        scrollToSection(currentSection + 1);
    } else {
        scrollToSection(currentSection - 1);
    }

    setTimeout(() => {
        isScrolling = false;
    }, SCROLL_TIMEOUT);
}

window.addEventListener('wheel', handleScroll, { passive: false });

document.addEventListener('mousedown', (event) => {
    if (event.button === 1) {
        event.preventDefault();
    }
});

document.addEventListener('auxclick', (event) => {
    if (event.button === 1) {
        event.preventDefault();
    }
});

let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
});

window.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaY) > MIN_SWIPE_DISTANCE && !popupOpen && !isScrolling) {
        if (deltaY < 0) {
            scrollToSection(currentSection + 1);
        } else if (deltaY > 0) {
            scrollToSection(currentSection - 1);
        }
    }
});

window.addEventListener('touchmove', (event) => {
    event.preventDefault();
}, { passive: false });


// Language toggle
let currentLanguage = 'english';

document.addEventListener('DOMContentLoaded', function () {
    const languageToggleButton = document.getElementById('languageToggle');
    const downloadLink = document.getElementById('downloadLink');

    languageToggleButton.innerText = 'EN/中文';

    languageToggleButton.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'english' ? 'chinese' : 'english';
        updateDownloadLinkAndButton();
        toggleLanguage();
    });

    updateDownloadLinkAndButton();
    toggleLanguage();
});

function toggleLanguage() {
    const questions = document.querySelectorAll('.Q-A');

    questions.forEach(question => {
        const englishQuestion = question.querySelector('.question-container .english');
        const chineseQuestion = question.querySelector('.question-container .chinese');
        const englishAnswer = question.querySelector('.answer-container .english');
        const chineseAnswer = question.querySelector('.answer-container .chinese');

        if (currentLanguage === 'english') {
            englishQuestion.style.display = 'block';
            chineseQuestion.style.display = 'none';
            englishAnswer.style.display = 'block';
            chineseAnswer.style.display = 'none';
        } else {
            englishQuestion.style.display = 'none';
            chineseQuestion.style.display = 'block';
            englishAnswer.style.display = 'none';
            chineseAnswer.style.display = 'block';
        }
    });
}

function updateDownloadLinkAndButton() {
    const downloadButton = document.getElementById('downloadButton');
    const downloadLink = document.getElementById('downloadLink');

    if (currentLanguage === 'english') {
        downloadLink.href = './assets/FAQ_EN.pdf';
        downloadLink.download = 'English FAQ.pdf';
        downloadButton.innerText = 'Download FAQ';
    } else {
        downloadLink.href = './assets/FAQ_CN.pdf';
        downloadLink.download = 'Chinese FAQ.pdf';
        downloadButton.innerText = '下载 FAQ';
    }
}


// FAQ toggle
function toggleAnswer(clickedQuestion) {
    const allAnswers = document.querySelectorAll('.answer-container');
    const answer = clickedQuestion.nextElementSibling;
    const isAnswerOpen = answer.style.display === "block";

    allAnswers.forEach(a => {
        a.style.display = "none";
        a.scrollTop = 0;
    });

    if (!isAnswerOpen) {
        answer.style.display = "block";
        requestAnimationFrame(() => {
            answer.scrollTop = 0;
        });
    }
}

document.querySelectorAll('.question-container').forEach(q => {
    q.addEventListener('click', () => toggleAnswer(q));
});


// Resize / orientation
let resizeTimeout;

function scrollToCurrentSection() {
    const sections = document.querySelectorAll('section');
    let visibleSection = null;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop >= 0 && sectionTop < window.innerHeight) {
            visibleSection = section;
        }
    });

    if (visibleSection) {
        visibleSection.scrollIntoView({ behavior: 'smooth' });
    }
}

window.addEventListener("orientationchange", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        scrollToCurrentSection();
    }, 200);
});

window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        scrollToCurrentSection();
    }, 200);
});

function showRSVPPopup(event) {
    event.preventDefault();
    document.getElementById('rsvpPopup').classList.add('active');
    popupOpen = true;
}

function closeRSVPPopup() {
    document.getElementById('rsvpPopup').classList.remove('active');
    popupOpen = false;
}