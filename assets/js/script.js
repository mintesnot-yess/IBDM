// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');

    // Toggle hamburger icon
    const icon = this.querySelector('i');
    if (menu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                document.querySelector('#mobile-menu-button i').classList.remove('fa-times');
                document.querySelector('#mobile-menu-button i').classList.add('fa-bars');
            }
        }
    });
});

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.id = 'back-to-top';
backToTopButton.className = 'hidden fixed bottom-6 right-6 bg-primary text-white  w-11 h-11 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50';
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



// For all navigation links
document.addEventListener('DOMContentLoaded', function () {
    const sections = {
        'services': document.getElementById('services'),
        'industries': document.getElementById('industries'),
        'contact': document.getElementById('contact')
    };

    const navLinks = {
        'services': document.querySelector('a[href="#services"]'),
        'industries': document.querySelector('a[href="#industries"]'),
        'contact': document.querySelector('a[href="index.html#contact"]')
    };

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const navLink = navLinks[sectionId];

            if (entry.isIntersecting) {
                // Add active class
                navLink.classList.add(
                    'border-primary',
                    'text-gray-900',
                    'border-b-2'
                );
                navLink.classList.remove(
                    'border-transparent',
                    'text-gray-500'
                );
            } else {
                // Remove active class
                navLink.classList.remove(
                    'border-primary',
                    'text-gray-900',
                    'border-b-2'
                );
                navLink.classList.add(
                    'border-transparent',
                    'text-gray-500'
                );
            }
        });
    }, observerOptions);

    // Observe all sections
    Object.values(sections).forEach(section => {
        if (section) observer.observe(section);
    });
});


// video player



const video = document.getElementById('videoPlayer');
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');

// Toggle play/pause on button click
playButton.addEventListener('click', function () {
    if (video.paused) {
        video.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        playButton.title = "pause";
    } else {
        video.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        playButton.title = "play";
    }
});

// Update icon when video ends
video.addEventListener('ended', function () {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    playButton.title = "play";
});

// Optional: Hide button when video is playing
video.addEventListener('play', () => {
    playButton.classList.add('opacity-0', 'invisible');
});

video.addEventListener('pause', () => {
    playButton.classList.remove('opacity-0', 'invisible');
});

// Show button on video hover
const videoContainer = document.querySelector('.relative');
videoContainer.addEventListener('mouseenter', () => {
    playButton.classList.remove('opacity-0', 'invisible');
});
videoContainer.addEventListener('mouseleave', () => {
    if (!video.paused) {
        playButton.classList.add('opacity-0', 'invisible');
    }
});



// Array of poster images
const posterImages = [
    'assets/images/Image1.jpg',
    'assets/images/Image2.jpg',
    'assets/images/Image3.jpg',
    'assets/images/Image4.jpg',
    'assets/images/Image5.jpg'
];

function setRandomPoster() {
    const video = document.getElementById('videoPlayer');
    if (!video || !posterImages.length) return;

    const randomIndex = Math.floor(Math.random() * posterImages.length);
    video.poster = posterImages[randomIndex];
}

// Initialize when page loads
window.onload = function () {
    setRandomPoster();

    // Change poster every 5 seconds (demo purposes)
    setInterval(setRandomPoster, 5000);
};


document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let company = document.getElementById('company').value;
    let industry = document.getElementById('industry').value;
    let phone = document.getElementById('phone').value;
    let message = document.getElementById('message').value;
    let SendButton = document.getElementById('sendButton');

    let errorMessage = document.getElementById('errorMessage');

    // Compose email body
    const emailBody = `
        Name: ${name}
        Email: ${email}
        Company: ${company}
        Industry: ${industry}
        Phone: ${phone}
        Message:
        ${message}
    `;

    // Create mailto link
    const mailtoLink = `mailto:mintesnotyess@gmail.com
        ?subject=New Contact Form Submission from ${encodeURIComponent(name)}
        &body=${encodeURIComponent(emailBody)}`;

    // Open default email client
    if (name && email && company && industry && phone && message) {
        window.location.href = mailtoLink;
        SendButton.textContent = 'Loading...';
        setInterval(() => {
            SendButton.textContent = 'Submit Request';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('company').value = '';
            document.getElementById('industry').value = '';
            document.getElementById('message').value = '';

        }, 2000);

    } else {

        if (errorMessage) {
            errorMessage.textContent = 'Please fill in all the required fields.';
            errorMessage.style.display = 'block';
        }
    }

});