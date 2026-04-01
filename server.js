const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// ===== INTELLIGENT CHAT ENGINE =====
class IntelligentChatBot {
  constructor() {
    this.rooms = [
      { name: "Standard Room", price: 4500 },
      { name: "Deluxe Room", price: 7000 },
      { name: "Suite", price: 12000 },
      { name: "Presidential Suite", price: 35000 },
      { name: "Ocean View Room", price: 9000 },
      { name: "City View Room", price: 6500 },
      { name: "Family Room", price: 10500 },
      { name: "Executive Room", price: 8500 }
    ];
  }

  // Simple text matching with synonyms
  matchesKeyword(text, keywords) {
    const lowerText = text.toLowerCase();
    return keywords.some(k => lowerText.includes(k));
  }

  chat(userMessage) {
    const msg = userMessage.toLowerCase();

    // Greetings
    if (this.matchesKeyword(msg, ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon'])) {
      return {
        text: "Welcome to <strong>Dubai Hotel</strong>! 🏨✨\n\nI'm your intelligent concierge. I can help with rooms, pricing, bookings, and more!\n\nWhat can I help you with?",
        qr: ["Room prices", "Check-in time", "Book a room", "Our services"]
      };
    }

    // Goodbye
    if (this.matchesKeyword(msg, ['bye', 'goodbye', 'thank you', 'thanks'])) {
      return {
        text: "You're welcome! 😊 We look forward to hosting you. Have a great day!"
      };
    }

    // Room prices
    if (this.matchesKeyword(msg, ['price', 'cost', 'rate', 'how much', 'room', 'rooms', 'expensive', 'affordable'])) {
      const roomList = this.rooms.map(r => `• <strong>${r.name}</strong> — Ksh ${r.price.toLocaleString()}/night`).join('\n');
      
      // Check if asking about specific room
      for (const room of this.rooms) {
        if (msg.includes(room.name.toLowerCase())) {
          return {
            text: `<strong>${room.name}</strong> costs <strong>Ksh ${room.price.toLocaleString()}/night</strong>.\n\nIncludes breakfast + Wi-Fi + all amenities.\n\nWant to book?`,
            qr: ["Book now", "Other rooms", "Check-in time"]
          };
        }
      }

      return {
        text: `All our room types:\n\n${roomList}\n\nAll include breakfast, Wi-Fi, and full access to facilities.`,
        qr: ["Book a room", "Room details", "Check-in info"]
      };
    }

    // Check-in
    if (this.matchesKeyword(msg, ['check-in', 'checkin', 'arrival', 'when', 'time'])) {
      return {
        text: "✓ Check-in: <strong>3:00 PM</strong>\n✓ Early check-in available on request\n✓ Contact us to arrange\n\nSee you soon!",
        qr: ["Check-out time", "Contact us", "Book now"]
      };
    }

    // Check-out
    if (this.matchesKeyword(msg, ['check-out', 'checkout', 'departure', 'leaving', 'late'])) {
      return {
        text: "✓ Check-out: <strong>12:00 PM</strong>\n✓ Late check-out available on request\n✓ Ask our concierge\n\nThank you for staying!",
        qr: ["Check-in time", "Contact us", "Book now"]
      };
    }

    // Breakfast
    if (this.matchesKeyword(msg, ['breakfast', 'meal', 'food', 'morning', 'eat'])) {
      return {
        text: "🍽️ <strong>Breakfast is INCLUDED</strong> in all rooms!\n\n✓ Daily: 7:00 AM - 10:00 AM\n✓ Buffet style\n✓ Local & international options\n✓ Free for all guests",
        qr: ["Room prices", "Restaurant info", "Book now"]
      };
    }

    // Services & Amenities  
    if (this.matchesKeyword(msg, ['service', 'amenity', 'amenities', 'facilities', 'offer', 'what do you have'])) {
      return {
        text: "We offer premium services:\n\n🏊 Swimming Pool\n🍽️ Fine Dining Restaurant\n💪 Fitness Center\n🧖 Spa & Beauty\n🏖️ Private Beach\n🅿️ Valet Parking\n📞 24/7 Concierge\n\nWhich interests you?",
        qr: ["Pool info", "Restaurant", "Spa", "Book now"]
      };
    }

    // Booking
    if (this.matchesKeyword(msg, ['book', 'booking', 'reserve', 'reservation', 'how to book'])) {
      return {
        text: "📅 <strong>Ready to book your stay?</strong>\n\nYou can book directly through our website or contact us:\n\n1. 🌐 <strong>Website booking</strong> — Fill out the form below\n2. 📞 <strong>Call us</strong> — +254-534-8765\n3. 💬 <strong>WhatsApp</strong> — +254 759 484 217\n4. 📧 <strong>Email</strong> — dubaihotel@example.com\n\n<strong>Click the button below to go to our booking form:</strong>",
        qr: ["Go to Booking Form", "Room prices", "Check-in time"],
        action: "scrollToReservation"
      };
    // Specific room booking
    for (const room of this.rooms) {
      if (msg.includes(room.name.toLowerCase()) && this.matchesKeyword(msg, ['book', 'reserve', 'want'])) {
        return {
          text: `Great choice! The <strong>${room.name}</strong> costs <strong>Ksh ${room.price.toLocaleString()}/night</strong>.\n\nReady to book? Click below to fill out our booking form with this room pre-selected.`,
          qr: ["Book this room", "Other rooms", "Room prices"],
          action: "scrollToReservation",
          room: room.name
        };
      }
    }

    // Contact
    if (this.matchesKeyword(msg, ['contact', 'phone', 'email', 'call', 'reach', 'how to reach'])) {
      return {
        text: "📞 <strong>Contact Dubai Hotel:</strong>\n\n📱 Phone: +254-534-8765\n📱 Alternative: +254-712-345-678\n💬 WhatsApp: +254 759 484 217\n📧 Email: dubaihotel@example.com\n📍 Address: 123 Embu Town, Embu\n\n24/7 Available!",
        qr: ["Book now", "Room prices", "Our services"]
      };
    }

    // Cancellation
    if (this.matchesKeyword(msg, ['cancel', 'cancellation', 'refund', 'policy'])) {
      return {
        text: "Cancellation Policy:\n\n✓ <strong>48+ hours before check-in</strong> = FREE\n✓ <strong>24-48 hours</strong> = One night charged\n✓ <strong>Less than 24 hours</strong> = Full amount charged\n\nContact us ASAP to cancel.",
        qr: ["Contact us", "Book anyway", "Room prices"]
      };
    }

    // Spa/Pool/Beach
    if (this.matchesKeyword(msg, ['spa', 'massage', 'beauty', 'wellness'])) {
      return {
        text: "🧖 <strong>Beauty & Spa</strong>\n\n✓ Professional massages\n✓ Facials & treatments\n✓ Wellness services\n✓ Relax and rejuvenate\n\nBook your treatment!",
        qr: ["Pool info", "Restaurant", "Book now"]
      };
    }

    if (this.matchesKeyword(msg, ['pool', 'swim', 'swimming', 'water'])) {
      return {
        text: "🏊 <strong>Luxurious Swimming Pool</strong>\n\n✓ Crystal clear water\n✓ Stunning views\n✓ Open to all guests\n✓ Perfect for relaxation\n\nCome enjoy!",
        qr: ["Beach info", "Fitness center", "Book now"]
      };
    }

    if (this.matchesKeyword(msg, ['beach', 'sand', 'seaside'])) {
      return {
        text: "🏖️ <strong>Private Resort Beach</strong>\n\n✓ Exclusive for guests\n✓ Water activities\n✓ Sunset views\n✓ Perfect relaxation spot\n\nCan't wait to see you!",
        qr: ["Pool info", "Restaurant", "Book now"]
      };
    }

    // Default
    return {
      text: "I'm here to help! 🤝\n\nI can assist with:\n• Room prices & details\n• Check-in/Check-out times\n• Breakfast & dining\n• Services & amenities\n• Bookings\n• Contact info\n\nWhat would you like to know?",
      qr: ["Room prices", "Check-in time", "Book now", "Contact us"]
    };
  }
}

const chatBot = new IntelligentChatBot();

// ===== HTTP SERVER =====
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Chat API
  if (pathname === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const response = chatBot.chat(data.message);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ text: 'Sorry, I encountered an error. Please try again.' }));
      }
    });
    return;
  }

  // Serve files
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.join(__dirname, pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml'
    };

    const contentType = mimeTypes[ext] || 'text/plain';
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Hotel website running at http://localhost:${PORT}`);
  console.log(`✅ Intelligent chatbot active! Try it at http://localhost:${PORT}/chat-assistant.html`);
});