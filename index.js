// Sample events data
const eventsData = [
    {
        id: 1,
        title: "Rock Concert Live",
        date: "2025-08-15",
        time: "8:00 PM",
        location: "Madison Square Garden, NY",
        category: "concerts",
        price: 89.99,
        image: "🎸",
        tickets: {
            "General Admission": 89.99,
            "VIP": 149.99,
            "Premium": 199.99
        },
        description: "An electrifying rock concert featuring top artists"
    },
    {
        id: 2,
        title: "The Amazing Movie",
        date: "2025-08-10",
        time: "7:30 PM",
        location: "Cinema Complex, LA",
        category: "movies",
        price: 15.99,
        image: "🎬",
        tickets: {
            "Standard": 15.99,
            "Premium": 19.99,
            "IMAX": 24.99
        },
        description: "A thrilling blockbuster movie experience"
    },
    {
        id: 3,
        title: "Football Championship",
        date: "2025-09-05",
        time: "3:00 PM",
        location: "MetLife Stadium, NJ",
        category: "sports",
        price: 125.00,
        image: "⚽",
        tickets: {
            "Nosebleed": 125.00,
            "Mid-tier": 225.00,
            "Field Level": 350.00
        },
        description: "Championship football match of the season"
    },
    {
        id: 4,
        title: "Broadway Musical",
        date: "2025-08-25",
        time: "8:00 PM",
        location: "Broadway Theater, NY",
        category: "theater",
        price: 95.00,
        image: "🎭",
        tickets: {
            "Balcony": 95.00,
            "Mezzanine": 145.00,
            "Orchestra": 195.00
        },
        description: "Award-winning Broadway musical performance"
    },
    {
        id: 5,
        title: "Jazz Night",
        date: "2025-08-20",
        time: "9:00 PM",
        location: "Blue Note, NY",
        category: "concerts",
        price: 45.00,
        image: "🎷",
        tickets: {
            "Standard": 45.00,
            "Premium": 65.00,
            "VIP Table": 95.00
        },
        description: "Smooth jazz evening with renowned artists"
    },
    {
        id: 6,
        title: "Action Thriller",
        date: "2025-08-12",
        time: "6:00 PM",
        location: "Multiplex Cinema, Chicago",
        category: "movies",
        price: 14.99,
        image: "🎥",
        tickets: {
            "Standard": 14.99,
            "Dolby": 18.99,
            "IMAX": 22.99
        },
        description: "High-octane action thriller"
    }
];

// DOM elements
const eventsGrid = document.getElementById('eventsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const bookingModal = document.getElementById('bookingModal');
const confirmationModal = document.getElementById('confirmationModal');
const bookingForm = document.getElementById('bookingForm');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Current booking data
let currentEvent = null;
let filteredEvents = [...eventsData];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderEvents(eventsData);
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });

    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    document.querySelector('.search-btn').addEventListener('click', handleSearch);

    // Mobile navigation
    navToggle.addEventListener('click', toggleMobileNav);

    // Modal functionality
    document.querySelector('.close').addEventListener('click', closeBookingModal);
    window.addEventListener('click', handleModalClick);

    // Booking form
    bookingForm.addEventListener('submit', handleBookingSubmit);
    document.getElementById('ticketType').addEventListener('change', calculatePrice);
    document.getElementById('quantity').addEventListener('input', calculatePrice);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function renderEvents(events) {
    eventsGrid.innerHTML = '';
    
    if (events.length === 0) {
        eventsGrid.innerHTML = '<p class="no-events">No events found matching your criteria.</p>';
        return;
    }

    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.dataset.category = event.category;
    
    const formatDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    card.innerHTML = `
        <div class="event-image">${event.image}</div>
        <div class="event-info">
            <h3 class="event-title">${event.title}</h3>
            <p class="event-date">${formatDate} at ${event.time}</p>
            <p class="event-location">${event.location}</p>
                    <p class="event-price">From $${event.price.toFixed(2)}</p>
                </div>
                <button class="book-btn" data-event-id="${event.id}">Book Now</button>
                        `;
             
                card.querySelector('.book-btn').addEventListener('click', () => openBookingModal(event));
                return card;
            }