let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

// Initialize Swiper
var swiper = new Swiper(".home-slider", {
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


// Set up the intersection observer
const slides = document.querySelectorAll('.swiper-slide');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const slideContent = entry.target.querySelector('.content');
        // Some slides (e.g. gallery slides) don't have a .content element — skip them
        if (!slideContent) return;
        const fadeItems = slideContent.querySelectorAll('.fade-item');

        // Trigger animation if the slide is in view
        if (entry.isIntersecting) {
            slideContent.classList.add('active');  // This will trigger the animations for all .fade-item
            fadeItems.forEach((item, index) => {
                // Apply delay to each item for sequential animation
                item.style.transitionDelay = `${index * 0.6}s`;
            });
        } else {
            slideContent.classList.remove('active');
            fadeItems.forEach(item => {
                item.style.transitionDelay = '0s';  // Reset the delay when out of view
            });
        }
    });
}, {
    threshold: 0.5,  // Trigger when 50% of the slide is visible
});

// Observe each slide
slides.forEach(slide => {
    observer.observe(slide);
});



var swiper = new Swiper(".room-slider", {
    spaceBetween: 20,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".gallery-slider", {
    spaceBetween: 10,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
    },
});

// availability form behaviour
(function(){
    const checkin = document.querySelector('.availability input[type=date]:first-of-type');
    const checkout = document.querySelector('.availability input[type=date]:nth-of-type(2)');
    const availabilityForm = document.querySelector('.availability form');

    if (checkin && checkout) {
        const nightCount = document.getElementById('night-count');
        const today = new Date().toISOString().split('T')[0];
        checkin.setAttribute('min', today);
        checkin.addEventListener('change', () => {
            if (checkin.value) {
                const minOut = new Date(checkin.value);
                minOut.setDate(minOut.getDate() + 1);
                checkout.setAttribute('min', minOut.toISOString().split('T')[0]);
                if (checkout.value && checkout.value <= checkin.value) {
                    checkout.value = '';
                }
                updateNights();
            }
        });
        // ensure checkout always > checkin
        checkout.addEventListener('change', () => {
            if (checkin.value && checkout.value && checkout.value <= checkin.value) {
                alert('Check-out must be after check-in');
                checkout.value = '';
            }
            updateNights();
        });

        function updateNights(){
            if (checkin.value && checkout.value) {
                const inDate = new Date(checkin.value);
                const outDate = new Date(checkout.value);
                const diff = Math.round((outDate - inDate)/(1000*60*60*24));
                nightCount.textContent = diff;
            } else {
                nightCount.textContent = '0';
            }
        }
    }

    if (availabilityForm) {
        availabilityForm.addEventListener('submit', function(e){
            if (checkin && checkout && checkin.value && checkout.value && checkout.value <= checkin.value) {
                e.preventDefault();
                alert('Please select a valid check-out date.');
            }
        });
    }
})();

const plusIcons = document.querySelectorAll('.gallery .slide .icon');
const popup = document.querySelector('.popup-image');
let popupImg, closeBtn, prevBtn, nextBtn, imageCount;
let currentImageIndex = 0;

if (popup) {
    popupImg = popup.querySelector('img');
    closeBtn = popup.querySelector('.close-btn');
    prevBtn = popup.querySelector('.prev-btn');
    nextBtn = popup.querySelector('.next-btn');
    imageCount = popup.querySelector('.image-count');

    function updateImageCount() {
        const totalSlides = document.querySelectorAll('.gallery .slide').length;
        imageCount.textContent = `${currentImageIndex + 1} / ${totalSlides}`;
    }

    function showImage(index) {
        const allSlides = document.querySelectorAll('.gallery .slide');
        currentImageIndex = index;
        const imageSource = allSlides[index].querySelector('img').getAttribute('src');
        popupImg.src = imageSource;
        updateImageCount();
    }

    plusIcons.forEach((icon, index) => {
        icon.onclick = (e) => {
            e.stopPropagation();
            popup.style.display = 'block';
            showImage(index);
        }
    });

    closeBtn.onclick = () => {
        popup.style.display = 'none';
    };

    prevBtn.onclick = (e) => {
        e.stopPropagation();
        const totalSlides = document.querySelectorAll('.gallery .slide').length;
        currentImageIndex = (currentImageIndex - 1 + totalSlides) % totalSlides;
        showImage(currentImageIndex);
    };

    nextBtn.onclick = (e) => {
        e.stopPropagation();
        const totalSlides = document.querySelectorAll('.gallery .slide').length;
        currentImageIndex = (currentImageIndex + 1) % totalSlides;
        showImage(currentImageIndex);
    };

    popup.onclick = (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    };

    document.addEventListener('keydown', (e) => {
        if (popup.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                popup.style.display = 'none';
            }
        }
    });
}

var swiper = new Swiper(".review-slider", {
    spaceBetween: 10,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// services

document.addEventListener('DOMContentLoaded', function() {
    // Animate each philosophy item when it scrolls into view
    const philosophyItems = document.querySelectorAll('.philosophy-item');

    if (philosophyItems.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const idx = Array.from(philosophyItems).indexOf(item);
                    console.log('philosophy item visible', idx, item); // debug
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, idx * 200);
                    obs.unobserve(item); // stop observing once animated
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px' // trigger a bit earlier
        });

        philosophyItems.forEach(item => {
            observer.observe(item);
        });
    }
});

// services

document.addEventListener('DOMContentLoaded', function() {
    // Select the services container
    const servicesContainer = document.querySelector('.services .box-container');
    const serviceBoxes = document.querySelectorAll('.services .box-container .box');

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class to each box when section is visible
                serviceBoxes.forEach(box => {
                    box.classList.add('animate');
                });
                // Disconnect the observer after triggering
                observer.disconnect();
            }
        });
    }, {
        // Options: trigger when 20% of the element is visible
        threshold: 0.2
    });

    // Start observing the services container
    if (servicesContainer) {
        observer.observe(servicesContainer);
    }
});

// faqs
document.addEventListener('DOMContentLoaded', function() {
    const faqContainer = document.querySelector('.faqs .faq-container');
    if (!faqContainer) return;

    const faqItems = document.querySelectorAll('.faqs .faq-container .faq');
    
    if (faqItems.length === 0) {
        console.warn('No FAQ items found');
        return;
    }

    // Add animation class when visible
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                faqItems.forEach(item => item.classList.add('animate'));
                obs.disconnect();
            }
        });
    }, { threshold: 0.15 });
    obs.observe(faqContainer);

    // Attach click handler to each FAQ h3
    faqItems.forEach((item, idx) => {
        const h3 = item.querySelector('h3');
        if (!h3) return;

        h3.style.cursor = 'pointer';

        h3.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const isActive = item.classList.contains('active');

            // Close all FAQs
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const p = faqItem.querySelector('p');
                if (p) p.style.display = 'none';
            });

            // Open clicked if wasn't already active
            if (!isActive) {
                item.classList.add('active');
                const p = item.querySelector('p');
                if (p) p.style.display = 'block';
            }
        });
    });
});

// FAQ search filter
(function(){
    const searchInput = document.querySelector('.faq-search input');
    const faqItems = document.querySelectorAll('.faqs .faq-container .faq');
    if (searchInput && faqItems.length) {
        searchInput.addEventListener('input', function(){
            const term = this.value.toLowerCase();
            faqItems.forEach(item => {
                const question = item.querySelector('h3')?.textContent.toLowerCase() || '';
                if (question.includes(term)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
})();

// contact form handler
(function(){
    const form = document.querySelector('.faqs .contact-form form');
    if (!form) return;
    form.addEventListener('submit', function(e){
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('fullName') || form.querySelector('input[type=text]').value;
        const email = formData.get('email') || form.querySelector('input[type=email]').value;
        const phone = formData.get('phone') || form.querySelector('input[type=tel]').value;
        const subject = form.querySelector('select').value;
        const message = form.querySelector('textarea').value;

        const record = {name,email,phone,subject,message,time:new Date().toISOString()};
        let stored = JSON.parse(sessionStorage.getItem('contactMessages')) || [];
        stored.push(record);
        sessionStorage.setItem('contactMessages', JSON.stringify(stored));

        alert('Thank you! Your message has been received.');
        form.reset();
    });
})();
    // Room button handlers for room section - navigate to reservation
    document.addEventListener('DOMContentLoaded', function() {
    const roomSection = document.querySelector('.room');
    if (roomSection) {
        // Get all room booking buttons
        const roomButtons = roomSection.querySelectorAll('.swiper-slide .content .btn');
        
        // Handle room booking buttons - navigate to reservation section
        roomButtons.forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                const room = this.closest('.slide');
                const roomName = room.querySelector('h3') ? room.querySelector('h3').textContent : 'Room';
                const roomPrice = room.querySelector('.price') ? room.querySelector('.price').textContent : 'Price not available';
                
                // Store selected room info
                sessionStorage.setItem('selectedRoom', roomName);
                sessionStorage.setItem('selectedRoomPrice', roomPrice);
                
                // Navigate to reservation section with smooth scroll
                const reservationSection = document.querySelector('.reservation');
                if (reservationSection) {
                    reservationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

    }
});



// Service button handlers
document.addEventListener('DOMContentLoaded', function() {
    const serviceButtons = document.querySelectorAll('.services .service-btn');
    
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.getAttribute('data-service');
            const serviceBox = this.closest('.box');
            const serviceTitle = serviceBox.querySelector('h3').textContent;
            const serviceDescription = serviceBox.querySelector('p').textContent;
            
            // Show service details in an alert
            alert(
                serviceName.toUpperCase() + '\n\n' +
                'Description: ' + serviceDescription + '\n\n' +
                'Contact our concierge team for more information or to book this service!'
            );
            
            // Store service inquiry
            let inquiries = JSON.parse(sessionStorage.getItem('serviceInquiries')) || [];
            inquiries.push({
                service: serviceName,
                timestamp: new Date().toLocaleString(),
                description: serviceDescription
            });
            sessionStorage.setItem('serviceInquiries', JSON.stringify(inquiries));
            
            // Visual feedback - highlight the button
            const originalColor = this.style.backgroundColor;
            this.style.backgroundColor = '#3A3A6A';
            this.style.color = '#F4C95D';
            setTimeout(() => {
                this.style.backgroundColor = originalColor;
                this.style.color = '';
            }, 600);
        });
    });
});

// ── Booking Form Handler ────────────────────────────────────────────────────
// Handled in HTML inline script

// chat widget handler
// wait until DOM loaded because chat HTML is added after script include
document.addEventListener('DOMContentLoaded', function() {
    const chatLog = document.getElementById('chatLog');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const toggle = document.getElementById('chatToggle');
    const widget = document.getElementById('aiChat');
    if (toggle && widget) {
        toggle.addEventListener('click', () => {
            widget.style.display = widget.style.display === 'block' ? 'none' : 'block';
        });
    }
    if (chatLog && chatInput && sendBtn) {
        // send an initial greeting
        chatLog.innerHTML += "<p><strong>AI:</strong> Hi there! Ask me anything about the hotel or booking.</p>";

        sendBtn.addEventListener('click', () => {
            const input = chatInput.value.toLowerCase();
            const chatLog = document.getElementById('chatLog');
            let reply = "Sorry 😅, I don't understand. Try asking about rooms, prices, or facilities.";
            let faqMatched = false;

            // use FAQ section to answer first (generic mapping)
            if(!window._faqMap){
                window._faqMap = {};
                document.querySelectorAll('.faqs .faq-container .faq').forEach(f => {
                    const q = f.querySelector('h3')?.textContent.toLowerCase() || '';
                    const a = f.querySelector('p')?.textContent || '';
                    if(q) window._faqMap[q] = a;
                });
            }
            // find best FAQ match based on word overlap, ignoring common "stop" words
            const stopWords = new Set(["is","the","a","an","and","or","of","to","in","on","for","with","our","we","you","do","does","are","please","us","your","at","from","that","this","what"]);
            let bestScore = 0;
            let bestAnswer = '';
            for(const q in window._faqMap){
                // normalize question text: replace hyphens with spaces before stripping
                const norm = q.replace(/[-]/g,' ').replace(/[^a-z0-9 ]/g,'');
                let words = norm.split(' ').filter(Boolean);
                // filter out stopwords to focus on keywords
                words = words.filter(w => !stopWords.has(w));
                if(words.length === 0) continue;
                let matchCount = 0;
                words.forEach(w => {
                    // if the raw word isn't found, also check for its concatenated form
                    if(input.includes(w) || input.includes(w.replace(/\s+/g, '')))
                        matchCount++;
                });
                const score = matchCount / words.length; // ratio of keywords matched
                if(score > bestScore){
                    bestScore = score;
                    bestAnswer = window._faqMap[q];
                }
            }
            // only use FAQ answer if at least one keyword matched (score>0)
            if(bestScore > 0){
                reply = bestAnswer;
                faqMatched = true;
            }

            // ===== 1. Room Info =====
            if(!faqMatched) {
            if(input.includes("room") || input.includes("suite") || input.includes("available rooms"))
                reply = "We have Standard ($100), Deluxe ($200), and Suite ($300).";

            // ===== 2. Pricing & Booking =====
            if(input.includes("price") || input.includes("total"))
                reply = "Use the booking form above to calculate your total price based on nights and room type.";
            if(input.includes("book") || input.includes("reserve"))
                reply = "Fill out the booking form above to reserve your room quickly and easily.";

            // ===== 3. Dates & Availability =====
            if(input.includes("available") || input.includes("dates") || input.includes("check-in") || input.includes("nights"))
                reply = "Select your check-in and check-out dates in the booking form to see availability and total nights.";
            // note: FAQ matching above will already return the exact text,
            // so this rule is no longer needed. Kept for backwards compatibility.
            if(input.includes("check-in") || input.includes("check in") || input.includes("check-out") || input.includes("check out")){
                reply = "Check-in is from 3:00 PM, and check-out is until 12:00 PM. Early check-in and late check-out may be available upon request, subject to availability.";
            }

            // ===== 4. Facilities & Services =====
            if(input.includes("wifi"))
                reply = "We offer free high-speed Wi-Fi in all rooms.";
            if(input.includes("breakfast"))
                reply = "Breakfast is included with every room and is served daily from 7:00 AM to 10:00 AM in the dining area. Enjoy a hot continental spread!";
            if(input.includes("parking"))
                reply = "We provide free parking for all guests.";
            if(input.includes("pets"))
                reply = "Pets are allowed in selected rooms. Please check with reception.";
            if(input.includes("pool") || input.includes("gym"))
                reply = "Yes, we have a pool and a gym available for all guests.";

            // ===== 5. Location & Contact =====
            if(input.includes("location") || input.includes("address"))
                reply = "Our hotel is located at 123 Main Street, Nairobi, Kenya.";
            if(input.includes("airport") || input.includes("pickup"))
                reply = "We offer airport pickup on request. Contact us to arrange it.";
            if(input.includes("contact") || input.includes("phone") || input.includes("number"))
                reply = "You can reach us at +254 700 000 000 or email info@hotel.com.";

            // ===== Payment Methods =====
            if(input.includes("payment") || input.includes("pay") || input.includes("credit") || input.includes("method"))
                reply = "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers.";

            // ===== 6. General / Polite =====
            if(input.includes("hello") || input.includes("hi") || input.includes("hey"))
                reply = "Hello! How can I assist you with your booking today?";
            if(input.includes("thank"))
                reply = "You're welcome! 😊";

            // ===== 7. Cancellations =====
            if(input.includes("cancel") || input.includes("cancellation"))
                reply = "We charge a 10% cancellation fee if you cancel within 24 hours of booking. Cancellations made more than 24 hours before check-in are free.";
            }

            // ===== Display Conversation =====
            chatLog.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
            chatLog.innerHTML += `<p><strong>AI:</strong> ${reply}</p>`;
            document.getElementById("chatInput").value = "";
            chatLog.scrollTop = chatLog.scrollHeight; // auto scroll
        });
        chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendBtn.click(); });
    }
});

// Google Maps initialization
function initMap() {
    // Check if google is available
    if (typeof google === 'undefined') {
        showMapError();
        return;
    }
    
    // Coordinates for Embu Town, Kenya (approximate)
    const hotelLocation = { lat: -0.5383, lng: 37.4504 };
    
    // Create map centered on hotel location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: hotelLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                "featureType": "poi.business",
                "stylers": [{ "visibility": "off" }]
            }
        ]
    });

    // Add marker for hotel location
    const marker = new google.maps.Marker({
        position: hotelLocation,
        map: map,
        title: "Dubai Hotel - Embu Town, Kenya",
        animation: google.maps.Animation.DROP
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="max-width: 250px; font-family: Arial, sans-serif;">
                <h3 style="margin: 0 0 8px 0; color: #2c3e50;">Dubai Hotel</h3>
                <p style="margin: 0 0 8px 0; color: #34495e;">🏨 Luxury Hotel in Embu Town</p>
                <p style="margin: 0 0 8px 0; color: #7f8c8d; font-size: 14px;">
                    123 Embu Town, Embu, Kenya
                </p>
                <p style="margin: 0; color: #27ae60; font-weight: bold;">
                    📞 +254-534-8765
                </p>
            </div>
        `
    });

    // Open info window on marker click
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });

    // Open info window by default
    setTimeout(() => {
        infoWindow.open(map, marker);
    }, 1000);
}

function showMapError() {
    const mapElement = document.getElementById("map");
    const errorElement = document.getElementById("map-error");
    if (mapElement && errorElement) {
        mapElement.style.display = "none";
        errorElement.style.display = "block";
    }
}