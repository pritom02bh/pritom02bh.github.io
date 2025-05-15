// ======= NAVIGATION MENU =======
const menuToggle = document.querySelector('.menu-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Mobile menu toggle for main site
if (menuToggle && navbarMenu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
}

// Mobile menu toggle for project pages
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
}

// Close menu when clicking on a nav link
document.querySelectorAll('.navbar-nav a, .nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (menuToggle && navbarMenu) {
      menuToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
    }
    if (navLinks) {
      navLinks.classList.remove('active');
    }
    document.body.classList.remove('menu-open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navbarMenu && navbarMenu.classList.contains('active') && 
      !navbarMenu.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    menuToggle.classList.remove('active');
    navbarMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
  
  if (navLinks && navLinks.classList.contains('active') && 
      !navLinks.contains(e.target) && 
      mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});

// ======= HERO CHART =======
document.addEventListener('DOMContentLoaded', () => {
  const chartCanvas = document.getElementById('hero-chart');
  
  if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    
    // Sample data for the chart
    const data = {
      labels: ['Data Analysis', 'Machine Learning', 'Visualization', 'NLP', 'Time Series', 'Big Data'],
      datasets: [{
        label: 'Skills',
        data: [90, 85, 88, 78, 82, 75],
        backgroundColor: 'rgba(67, 97, 238, 0.2)',
        borderColor: 'rgba(67, 97, 238, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(67, 97, 238, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(67, 97, 238, 1)',
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    };
    
    // Chart configuration
    const config = {
      type: 'radar',
      data: data,
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              display: false
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            angleLines: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            pointLabels: {
              font: {
                size: 14,
                family: "'Inter', sans-serif",
                weight: '500'
              },
              color: '#495057'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#212529',
            bodyColor: '#495057',
            borderColor: 'rgba(67, 97, 238, 0.3)',
            borderWidth: 1,
            caretSize: 8,
            cornerRadius: 8,
            padding: 12,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            titleFont: {
              size: 16,
              weight: '600'
            },
            bodyFont: {
              size: 14
            },
            displayColors: false
          }
        },
        elements: {
          line: {
            tension: 0.2
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
    
    // Create the chart
    const myChart = new Chart(ctx, config);
    
    // Animation on scroll for the chart
    window.addEventListener('scroll', () => {
      const chartRect = chartCanvas.getBoundingClientRect();
      if (chartRect.top < window.innerHeight && chartRect.bottom > 0) {
        myChart.update();
      }
    });
  }
});

// ======= PROJECT FILTERING =======
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to the clicked button
      button.classList.add('active');
      
      // Get the filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter the projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ======= ANIMATE ON SCROLL INITIALIZATION =======
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// ======= BACK TO TOP BUTTON =======
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  // Show the button when the user scrolls down 300px from the top
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  // Scroll to top when the button is clicked
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ======= NAVBAR SCROLL EFFECT =======
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      navbar.style.backdropFilter = 'blur(10px)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.backdropFilter = 'blur(0)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    }
  });
}

// ======= SMOOTH SCROLL FOR ANCHOR LINKS =======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  });
}); 