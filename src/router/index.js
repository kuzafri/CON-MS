import AppLayout from '@/layout/AppLayout.vue';
import AppLayoutCustomer from '@/layout/AppLayoutCustomer.vue';
import AppLayoutAdmin from '@/views/admin/AppLayout.vue';
import AppLayoutOrganizer from '@/views/organizer/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dashboard',
            component: AppLayout,
            children: [
                // {
                //     path: '/',
                //     name: 'dashboard',
                //     component: () => import('@/views/Dashboard.vue')
                // },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/InputDoc.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/ButtonDoc.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/TableDoc.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/ListDoc.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/TreeDoc.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/PanelsDoc.vue')
                },
                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/OverlayDoc.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/MediaDoc.vue')
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/MessagesDoc.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/FileDoc.vue')
                },
                {
                    path: '/uikit/menu',
                    name: 'menu',
                    component: () => import('@/views/uikit/MenuDoc.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/ChartDoc.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/MiscDoc.vue')
                },
                {
                    path: '/uikit/timeline',
                    name: 'timeline',
                    component: () => import('@/views/uikit/TimelineDoc.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue')
                }
            ]
        },
        {
            path: '/admin',
            component: AppLayoutAdmin,
            children: [
                {
                    path: 'dashboard',
                    name: 'Admin Dashboard',
                    component: () => import('@/views/admin/Dashboard.vue')
                },
                {
                    path: 'events',
                    name: 'Events',
                    component: () => import('@/views/admin/Events.vue')
                },
                {
                    path: 'users',
                    name: 'Users',
                    component: () => import('@/views/admin/Users.vue')
                },
                {
                    path: 'complaints',
                    name: 'complaints',
                    component: () => import('@/views/admin/Complaint.vue')
                },
                {
                    path: 'events-detail/:id',
                    name: 'EventsDetails',
                    component: () => import('@/views/admin/EventsDetails.vue'),
                    props: true
                },
                {
                    path: 'organiser-detail/:id',
                    name: 'OrganiserDetails',
                    component: () => import('@/views/admin/OrganiserDetails.vue'),
                    props: true
                },
                {
                    path: 'admin-profile/:id',
                    name: 'AdminProfile',
                    component: () => import('@/views/admin/Profile.vue'),
                    props: true
                }
            ]
        },
        {
            path: '/organizer',
            component: AppLayoutOrganizer,
            children: [
                {
                    path: 'event',
                    name: 'eventorganizer',
                    component: () => import('@/views/organizer/Event.vue')
                },
                {
                    path: 'viewevent',
                    name: 'viewevent',
                    component: () => import('@/views/organizer/ViewEvent.vue')
                },
                {
                    path: 'event-details/:id',
                    name: 'EventDetails',
                    component: () => import('@/views/organizer/EventDetails.vue'),
                    props: true
                },
                {
                    path: 'event-details/:id/event-inventory',
                    name: 'EventInventory',
                    component: () => import('@/views/organizer/EventInventory.vue'),
                    props: true
                },
                {
                    path: 'event-details/:id/event-audiences',
                    name: 'EventAudiences',
                    component: () => import('@/views/organizer/EventAudiences.vue'),
                    props: true
                },
                {
                    path: 'complaint',
                    name: 'complaint',
                    component: () => import('@/views/organizer/Complaint.vue')
                },
                {
                    path: 'help',
                    name: 'help',
                    component: () => import('@/views/organizer/Help.vue')
                }
            ]
        },
        {
            path: '/',
            component: AppLayoutCustomer,
            children: [
                {
                    path: '/booking',
                    name: 'Booking',
                    component: () => import('@/views/pages/Booking.vue')
                },
                {
                    path: '/eventdetail',
                    name: 'EventDetail',
                    component: () => import('@/views/pages/EventDetail.vue')
                },
                {
                    path: '/payment',
                    name: 'Payment',
                    component: () => import('@/views/pages/Payment.vue')
                },
                {
                    path: '/event',
                    name: 'event',
                    component: () => import('@/views/pages/Event.vue')
                },
                {
                    path: '/ticket',
                    name: 'ticket',
                    component: () => import('@/views/pages/Ticket.vue')
                },
                {
                    path: '/homebook',
                    name: 'homebook',
                    component: () => import('@/views/pages/Homebook.vue')
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: () => import('@/views/pages/Profile.vue')
                }
            ]
        },
        {
            path: '/',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/register',
            name: 'register',
            component: () => import('@/views/pages/auth/Register.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
