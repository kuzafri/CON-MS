// src/composables/useEvents.js
import { ref } from 'vue';

// Dummy event data
const dummyEvents = [
    {
        _id: '1',
        concertTitle: 'Malam Citra Budaya',
        organizerName: 'MPP USM',
        venue: 'Dewan Tuanku Syed Putra, USM',
        calendarValue: '2024-12-25T19:00:00.000Z',
        startTime: '19:00',
        endTime: '22:00',
        regularPrice: 50,
        economyPrice: 30,
        vipPrice: 100,
        description: 'A cultural night featuring traditional Malaysian music and dance performances. Experience the rich heritage of Malaysia through music, dance, and cultural presentations.',
        image: '/concert.jpeg',
        status: 'active',
        organizerId: 'org1',
        genre: 'Traditional Malaysian Music',
        performers: ['MPP USM Cultural Group', 'Traditional Dance Ensemble', 'Gamelan Orchestra', 'Boria Performance Group']
    },
    {
        _id: '2',
        concertTitle: 'REBEL 3.0: Because of you',
        organizerName: 'USM Jazz Band',
        venue: 'Auditorium Canselori, USM',
        calendarValue: '2024-12-30T20:00:00.000Z',
        startTime: '20:00',
        endTime: '23:00',
        regularPrice: 80,
        economyPrice: 50,
        vipPrice: 150,
        description: 'The third installment of the REBEL series featuring jazz, rock, and contemporary music. A night of powerful performances and musical innovation.',
        image: '/concert.png',
        status: 'active',
        organizerId: 'org2',
        genre: 'Jazz, Rock, Contemporary',
        performers: ['USM Jazz Band', 'The Rebels', 'Sonic Wave', 'Electric Dreams']
    },
    {
        _id: '3',
        concertTitle: 'Taylor Swift Tribute Night',
        organizerName: 'Thriller Jazz Band',
        venue: 'Penang Convention Centre',
        calendarValue: '2025-01-15T19:30:00.000Z',
        startTime: '19:30',
        endTime: '22:30',
        regularPrice: 120,
        economyPrice: 80,
        vipPrice: 200,
        description: 'A special tribute night featuring Taylor Swift\'s greatest hits performed by local artists. Relive the magic of Taylor\'s music through amazing local talent.',
        image: '/concert2.png',
        status: 'active',
        organizerId: 'org3',
        genre: 'Pop, Country, Alternative',
        performers: ['Sarah Chen', 'The Swifties', 'Pop Sensation', 'Country Roads']
    },
    {
        _id: '4',
        concertTitle: 'Joji Live in Malaysia',
        organizerName: 'REBEL Productions',
        venue: 'Axiata Arena, KL',
        calendarValue: '2025-02-14T20:00:00.000Z',
        startTime: '20:00',
        endTime: '23:00',
        regularPrice: 150,
        economyPrice: 100,
        vipPrice: 250,
        description: 'Joji\'s first live performance in Malaysia featuring his latest album and greatest hits. Experience the unique blend of lo-fi, R&B, and alternative music.',
        image: '/joji.webp',
        status: 'active',
        organizerId: 'org4',
        genre: 'Lo-fi, R&B, Alternative',
        performers: ['Joji', '88rising Crew', 'Local Support Acts', 'Special Guest DJs']
    }
];

export function useEvent() {
    const event = ref(null);
    const events = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchEventById = async (id) => {
        loading.value = true;
        error.value = null;
        
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const foundEvent = dummyEvents.find(e => e._id === id);
            if (foundEvent) {
                event.value = foundEvent;
            } else {
                error.value = 'Event not found';
            }
        } catch (err) {
            error.value = err.message || 'Failed to fetch event';
            console.error('Error fetching event:', err);
        } finally {
            loading.value = false;
        }
    };

    const fetchAllEvents = async () => {
        loading.value = true;
        error.value = null;
        
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));
            events.value = dummyEvents;
        } catch (err) {
            error.value = err.message || 'Failed to fetch events';
            console.error('Error fetching events:', err);
        } finally {
            loading.value = false;
        }
    };

    const getFeaturedEvents = async () => {
        loading.value = true;
        error.value = null;
        
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 200));
            // Return first 2 events as featured
            return dummyEvents.slice(0, 2);
        } catch (err) {
            error.value = err.message || 'Failed to fetch featured events';
            console.error('Error fetching featured events:', err);
            return [];
        } finally {
            loading.value = false;
        }
    };

    return {
        event,
        events,
        loading,
        error,
        fetchEventById,
        fetchAllEvents,
        getFeaturedEvents
    };
}