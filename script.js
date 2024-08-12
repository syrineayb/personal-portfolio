// script.js

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '') {
        alert('Please enter your name.');
        document.getElementById('name').focus();
        return;
    }
    if (email === '') {
        alert('Please enter your email.');
        document.getElementById('email').focus();
        return;
    }
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        document.getElementById('email').focus();
        return;
    }
    if (message === '') {
        alert('Please enter your message.');
        document.getElementById('message').focus();
        return;
    }

    alert(`Thank you, ${name}! Your message has been sent.`);
    document.getElementById('contactForm').reset();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}




// script.js

function toggleProjectDetails(button) {
    const details = button.nextElementSibling; // Select the next sibling (project-details div)

    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        button.textContent = 'Show Less'; // Change button text to "Show Less"
    } else {
        details.classList.add('hidden');
        button.textContent = 'Learn More'; // Change button text back to "Learn More"
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');

    // Set the sidebar to open by default
    sidebar.classList.add('open');

    // Function to toggle the sidebar
    function toggleSidebar() {
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            sidebar.classList.add('closed');
        } else {
            sidebar.classList.remove('closed');
            sidebar.classList.add('open');
        }
    }

    // Attach click event to toggle button
    toggleBtn.addEventListener('click', toggleSidebar);
});

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        link.addEventListener('click', function () {
            // Remove 'active' class from all links
            links.forEach(link => link.classList.remove('active'));

            // Add 'active' class to the clicked link
            this.classList.add('active');
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const colorCircles = document.querySelectorAll('.color-circle');

    colorCircles.forEach(circle => {
        circle.addEventListener('click', function () {
            const primaryColor = this.getAttribute('data-primary');
            const secondaryColor = this.getAttribute('data-secondary');
            // Change CSS variables based on selected colors
            document.documentElement.style.setProperty('--primary-color', primaryColor);
            document.documentElement.style.setProperty('--secondary-color', secondaryColor);
            document.documentElement.style.setProperty('--background-color', adjustBrightness(primaryColor, 50));
            document.documentElement.style.setProperty('--text-color', adjustBrightness(primaryColor, -30));
        });
    });

    function adjustBrightness(hex, percent) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        r = Math.min(255, Math.max(0, r + (r * percent / 100)));
        g = Math.min(255, Math.max(0, g + (g * percent / 100)));
        b = Math.min(255, Math.max(0, b + (b * percent / 100)));

        return `rgb(${r}, ${g}, ${b})`;
    }
});
   // Sample project data
   const projects = [
    {
        title: "E-Learning Platform",
        description: "A robust E-Learning platform built using Spring Boot for the backend and Angular for the frontend.",
        technologies: "Spring Boot, Angular, MySQL, Figma",
        link: "https://github.com/syrineayb/EduCare"
    },
    {
        title: "Hotel Booking System",
        description: "A web application for booking hotel rooms.",
        technologies: "JEE, HTML, CSS, MySQL",
        link: "https://github.com/syrineayb/HotelBookingApp"
    },
    {
        title: "Kotlin Weather App",
        description: "A simple weather app built with Kotlin that provides weather forecasts based on location.",
        technologies: "Kotlin, Weather API, Android SDK",
        link: "https://github.com/syrineayb/WeatherApp-Kotlin"
    },
    {
        title: "Quiz App",
        description: "A simple quiz application built with Kotlin that allows users to answer multiple-choice questions and track their scores.",
        technologies: "Kotlin, Android SDK",
        link: "https://github.com/syrineayb/QuizApp-Kotlin"
    }
    // Add more project objects here
];

const projectsPerPage = 3; // Number of projects per page
let currentPage = 1;

function displayProjects(page) {
    const start = (page - 1) * projectsPerPage;
    const end = start + projectsPerPage;
    const projectsToShow = projects.slice(start, end);

    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = ''; // Clear previous projects

    projectsToShow.forEach(project => {
        const projectElement = document.createElement('a');
        projectElement.href = project.link;
        projectElement.target = '_blank';
        projectElement.className = 'block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300';
        projectElement.innerHTML = `
            <h3 class="text-2xl font-bold mb-2 hover:text-blue-400">${project.title}</h3>
            <p class="text-gray-700">${project.description}</p>
            <p class="text-gray-500 mt-2">Technologies: <span class="text-blue-600">${project.technologies}</span></p>
        `;
        projectsContainer.appendChild(projectElement);
    });

    displayPaginationControls();
}

function displayPaginationControls() {
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear previous pagination controls

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'px-4 py-2 mx-1 border rounded-lg bg-blue-600 text-white hover:bg-blue-700';
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayProjects(currentPage);
        });
        if (i === currentPage) {
            pageButton.classList.add('bg-blue-700');
        }
        paginationContainer.appendChild(pageButton);
    }
}

// Initial display
displayProjects(currentPage);