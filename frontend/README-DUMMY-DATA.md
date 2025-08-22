# CON-MS Frontend with Dummy Data - No Authentication Required

This version of the CON-MS frontend has been configured to work without a backend connection and **NO AUTHENTICATION IS REQUIRED** for any features.

## Features

✅ **No Backend Required** - App works completely offline
✅ **No Authentication Required** - All features accessible without login
✅ **Dummy Event Data** - 4 sample events with full details
✅ **Full Navigation** - Homepage → Event Details → Booking → Payment
✅ **Responsive Design** - Works on all device sizes
✅ **Dark/Light Theme** - Toggle between themes

## Available Events

1. **Malam Citra Budaya** - Traditional Malaysian Music
2. **REBEL 3.0: Because of you** - Jazz, Rock, Contemporary
3. **Taylor Swift Tribute Night** - Pop, Country, Alternative
4. **Joji Live in Malaysia** - Lo-fi, R&B, Alternative

## Navigation Flow

1. **Landing Page** (`/`) - View featured events
2. **Events Page** (`/event`) - Browse all events
3. **Event Details** (`/eventdetail/:id`) - View event information
4. **Booking Page** (`/booking/:id`) - Select seats and book tickets
5. **Payment Page** (`/payment`) - Complete payment process

## How to Use

1. **Start the app**: `npm run dev`
2. **Navigate from homepage**: Click "See Detail" or "Book Now" on any event
3. **View event details**: See full event information, countdown, and ticket prices
4. **Book tickets**: Select seats and proceed to booking (no login required)
5. **Complete payment**: Go through payment process (simulated)

## Configuration

The app is configured in `src/config/app.js`:

```javascript
export const appConfig = {
    useDummyData: true,        // Use dummy data instead of backend
    backend: {
        enabled: false,         // Backend is disabled
        baseUrl: '',            // No backend URL
        timeout: 10000
    },
    auth: {
        required: false,        // No authentication required
        enabled: false          // Authentication is disabled
    }
};
```

## Dummy Data Structure

Each event includes:
- Basic info (title, organizer, venue, date/time)
- Ticket prices (Economy, Regular, VIP)
- Description and genre
- Performers list
- Event image

## Development

- **Add new events**: Edit `src/composables/useEvent.js`
- **Modify dummy data**: Update the `dummyEvents` array
- **Change configuration**: Edit `src/config/app.js`

## Notes

- **No authentication required** - All users can access all features
- All API calls are intercepted when backend is disabled
- Booking creation works without login
- Payment process is simulated
- Images are served from the `public/` folder
- Admin and organizer pages are accessible without authentication

## Security Note

⚠️ **This configuration is for development/demo purposes only.** In a production environment, you would want to implement proper authentication and authorization controls.
