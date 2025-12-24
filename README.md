# HOTEL BOOKING ⚽🏨

A modern, full-stack hotel booking application with unique football club theming, combining luxury hospitality with sports passion.

![Hotel Booking App](https://img.shields.io/badge/Status-Live-success) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![React](https://img.shields.io/badge/React-18-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)

## ✨ Features

### 🎯 Guest Experience
- **Football-Themed Rooms**: Unique accommodations inspired by legendary clubs (Arsenal, Barcelona, Real Madrid, etc.)
- **Real-time Availability**: Instant room status updates and booking confirmation
- **Interactive Booking**: User-friendly forms with CAPTCHA security
- **Detailed Room Pages**: Comprehensive information with club-specific theming
- **Responsive Design**: Seamless experience across all devices

### 🏨 Room Management
- **Dynamic Filtering**: Filter by availability, capacity, and room type
- **Club Authentication**: Official club logos and color schemes
- **Smart Search**: Find rooms based on dates and guest requirements
- **Visual Status Indicators**: Clear availability badges and booking states

### 👨‍💼 Admin Features
- **Dashboard Overview**: Real-time booking statistics and room status
- **Booking Management**: Confirm, cancel, and track all reservations
- **Guest Information**: Access booking history and contact details
- **Room Configuration**: Update room status and pricing

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with Hooks and Functional Components
- **Redux Toolkit** for State Management
- **Tailwind CSS** for Styling
- **Next/Image** for Optimized Images
- **ESLint** for Code Quality

### Backend Integration
- **Django REST Framework** API
- **JWT Authentication**
- **RESTful API Endpoints**
- **PostgreSQL Database**

### Key Dependencies
- `react-redux` - State management
- `next-themes` - Dark mode support
- `react-hook-form` - Form handling
- `date-fns` - Date utilities

## 📁 Project Structure

```
hotel-app/
├── app/                   # Next.js app router pages
│   ├── admin/             # Admin dashboard
│   ├── rooms/             # Room listing and details
│   ├── api/               # API routes (if applicable)
│   └── layout.js          # Root layout
├── components/            # React components
│   ├── BookingForm.js     # Main booking form
│   ├── RoomCard.js        # Room display card
│   ├── BookingModal.js    # Modal for bookings
│   └── Navbar.js          # Navigation component
├── store/                 # Redux store configuration
│   ├── bookingSlice.js    # Booking state management
│   ├── authSlice.js       # Authentication state
│   └── store.js           # Redux store setup
├── lib/                   # Utilities and configurations
│   ├── api.js            # API client configuration
│   └── constants.js      # Application constants
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Backend API running (Django REST Framework)
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Akpan20/hotel-app.git
cd hotel-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Configuration**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

5. **Open in Browser**
Navigate to `http://localhost:3000`

## 🔧 Configuration

### API Integration
Update `lib/api.js` to point to your backend API:
```javascript
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Styling Customization
Modify Tailwind configuration in `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'arsenal-red': '#EF0107',
        'barcelona-blue': '#004D98',
        'chelsea-blue': '#034694',
        // Add more club colors
      },
    },
  },
}
```

## 📱 Component Overview

### BookingForm.js
The main booking interface featuring:
- Guest information collection
- Date selection with validation
- Room availability checking
- CAPTCHA integration for security
- Real-time price calculation

### RoomCard.js
Interactive room display card with:
- Club-specific gradient backgrounds
- Official club logos
- Dynamic status indicators
- Capacity and pricing information
- Quick booking action

### Admin Dashboard
Comprehensive management interface:
- Booking overview and statistics
- Room status monitoring
- Guest management tools
- Booking confirmation/cancellation

## 🔒 Security Features

- **CAPTCHA Verification**: Prevents automated booking attempts
- **Input Validation**: Client and server-side validation
- **Protected Routes**: Admin routes require authentication
- **Secure API Calls**: JWT token-based authentication
- **XSS Protection**: Sanitized user inputs

## 🎨 Design System

### Color Themes
- **Club Gradients**: Each room uses authentic club color schemes
- **Status Colors**: Clear visual indicators for room availability
- **Dark Mode**: Full dark mode support for better UX

### Typography
- **Inter Font**: Modern, readable typeface
- **Hierarchy**: Clear visual hierarchy for content
- **Responsive Text**: Adapts to different screen sizes

### Animations
- **Smooth Transitions**: Hover effects and state changes
- **Loading States**: Skeleton loaders and spinners
- **Interactive Elements**: Engaging user interactions

## 📊 State Management

### Redux Store Structure
```javascript
{
  bookings: {
    rooms: [],           // All rooms data
    list: [],           // Booking history
    loading: boolean,   // Loading states
    error: null,       // Error handling
    captcha: {},       // CAPTCHA data
    availability: {}   // Room availability
  },
  auth: {
    user: null,        // User information
    token: null,       // Authentication token
    loading: boolean   // Auth loading state
  }
}
```

## 🔄 API Integration

### Key Endpoints
- `GET /bookings/rooms/` - Fetch all rooms
- `POST /bookings/` - Create new booking
- `GET /bookings/my_bookings/` - User bookings
- `POST /bookings/captcha/` - CAPTCHA generation
- `GET /bookings/rooms/{id}/availability/` - Check availability

### Request/Response Examples
```javascript
// Booking creation
POST /bookings/
{
  "room": 101,
  "check_in": "2024-01-15",
  "check_out": "2024-01-18",
  "guest_name": "John Doe",
  "guest_email": "john@example.com"
}

// Response
{
  "id": 123,
  "booking_reference": "BOPH-2024-00123",
  "status": "confirmed",
  "total_price": "450.00"
}
```

## 🧪 Testing

### Run Tests
```bash
npm test
# or
yarn test
```

### Test Coverage
- Component unit tests
- Redux reducer tests
- API integration tests
- User interaction tests

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deployment Options
1. **Vercel** (Recommended)
```bash
vercel deploy
```

2. **Docker Deployment**
```bash
docker build -t bophill-suites .
docker run -p 3000:3000 bophill-suites
```

3. **Traditional Hosting**
- Build static files
- Configure web server (Nginx/Apache)
- Set up reverse proxy for API

## 📈 Performance

### Optimizations
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching Strategy**: Efficient API response caching

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Use descriptive commit messages

## 📄 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Football club logos from Wikimedia Commons
- Inspiration from luxury hotel booking platforms
- Open source community for amazing tools and libraries

## 📞 Support

For support, email support@hotelapp.com or open an issue in the GitHub repository.

---

**Built with passion for football and hospitality** ⚽❤️🏨

*Experience luxury with a sporting twist*