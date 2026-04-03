/* script.js - Dynamic Interactivity */

// Mock Job Data
const sampleJobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Google",
        location: "Mountain View, CA",
        salary: "$120k - $180k",
        tags: ["React", "TypeScript", "UI/UX"],
        logoColor: "#4285F4"
    },
    {
        id: 2,
        title: "Backend Engineer",
        company: "Amazon",
        location: "Seattle, WA",
        salary: "$130k - $190k",
        tags: ["Node.js", "AWS", "NoSQL"],
        logoColor: "#FF9900"
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "Microsoft",
        location: "Redmond, WA",
        salary: "$140k - $200k",
        tags: ["C#", "Azure", "Angular"],
        logoColor: "#00A4EF"
    },
    {
        id: 4,
        title: "SDE Intern",
        company: "Meta",
        location: "Menlo Park, CA",
        salary: "$8k - $12k / Mo",
        tags: ["Python", "Algorithms", "DSA"],
        logoColor: "#0668E1"
    },
    {
        id: 5,
        title: "DevOps Engineer",
        company: "Netflix",
        location: "Los Gatos, CA",
        salary: "$150k - $220k",
        tags: ["Docker", "Kubernetes", "CI/CD"],
        logoColor: "#E50914"
    },
    {
        id: 6,
        title: "Cyber Security Analyst",
        company: "Tesla",
        location: "Austin, TX",
        salary: "$110k - $160k",
        tags: ["Security", "Linux", "Python"],
        logoColor: "#CC0000"
    }
];

// Initialize UI Functions
// Initialize UI Functions
document.addEventListener('DOMContentLoaded', () => {
    loadJobs();
    setupMobileMenu();
    setupSearch();
    handleScrollAnimations();
    setupThemeToggle();
});

// Theme Toggle Logic
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    const icon = themeToggleBtn.querySelector('i');
    
    // Check saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

// Load Jobs into the container
function loadJobs(filter = '') {
    const jobContainer = document.getElementById('job-container');
    if (!jobContainer) return;

    jobContainer.innerHTML = '';
    
    const filteredJobs = filter 
        ? sampleJobs.filter(job => 
            job.title.toLowerCase().includes(filter.toLowerCase()) || 
            job.company.toLowerCase().includes(filter.toLowerCase()))
        : sampleJobs;

    if (filteredJobs.length === 0) {
        jobContainer.innerHTML = '<div class="glass-card center-content full-width">No jobs found matching your search.</div>';
        return;
    }

    filteredJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'glass-card job-card hover-glow animate-up';
        jobCard.innerHTML = `
            <div class="job-header">
                <div class="company-logo" style="color: ${job.logoColor}">${job.company.charAt(0)}</div>
                <div class="job-info">
                    <h3>${job.title}</h3>
                    <p class="text-secondary">${job.company} • ${job.location}</p>
                </div>
            </div>
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="job-footer">
                <span class="salary">${job.salary}</span>
                <button class="btn btn-primary btn-sm">Apply Now</button>
            </div>
        `;
        jobContainer.appendChild(jobCard);
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-xmark');
        });
    }
}

// Basic Search Functionality
function setupSearch() {
    const searchBtn = document.querySelector('.btn-search');
    const searchInput = document.querySelector('.search-field input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            loadJobs(searchInput.value);
            document.getElementById('job-container').scrollIntoView({ behavior: 'smooth' });
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                loadJobs(searchInput.value);
                document.getElementById('job-container').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Simple Intersection Observer for Animations
function handleScrollAnimations() {
    const options = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);
    
    document.querySelectorAll('.animate-up, .glass-card').forEach(el => observer.observe(el));
}
