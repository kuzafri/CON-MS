<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const currentPrefix = '/organizer';
const model = ref([
    // {
    //     label: 'Organizer',
    //     items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    // },
    {
        label: 'Organizer',
        items: [
            { label: 'Create New Concert', icon: 'pi pi-fw pi-id-card', to: `${currentPrefix}/event` },
            { label: 'View All Concert', icon: 'pi pi-fw pi-check-square', to: `${currentPrefix}/viewevent` },
            { label: 'Complaint', icon: 'pi pi-fw pi-mobile', to: `${currentPrefix}/complaint`, class: 'rotated-icon' },
            // { label: 'Help', icon: 'pi pi-fw pi-table', to: `${currentPrefix}/help` },
            // { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            // { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            // { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            // { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            // { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
            // { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            // { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            // { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
            // { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        ]
    },
    {
        // label: 'Pages',
        // icon: 'pi pi-fw pi-briefcase',
        // to: '/pages',
        // items: [
        //     {
        //         label: 'Create New Concert',
        //         icon: 'pi pi-fw pi-globe',
        //         to: 'event'
        //     },
        //     {
        //         label: 'View All Concert',
        //         icon: 'pi pi-fw pi-globe',
        //         to: 'viewevent'
        //     },
        //     {
        //         label: 'Auth',
        //         icon: 'pi pi-fw pi-user',
        //         items: [
        //             {
        //                 label: 'Login',
        //                 icon: 'pi pi-fw pi-sign-in',
        //                 to: '/auth/login'
        //             },
        //             {
        //                 label: 'Error',
        //                 icon: 'pi pi-fw pi-times-circle',
        //                 to: '/auth/error'
        //             },
        //             {
        //                 label: 'Access Denied',
        //                 icon: 'pi pi-fw pi-lock',
        //                 to: '/auth/access'
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Crud',
        //         icon: 'pi pi-fw pi-pencil',
        //         to: '/pages/crud'
        //     },
        //     {
        //         label: 'Not Found',
        //         icon: 'pi pi-fw pi-exclamation-circle',
        //         to: '/pages/notfound'
        //     },
        //     {
        //         label: 'Empty',
        //         icon: 'pi pi-fw pi-circle-off',
        //         to: '/pages/empty'
        //     }
        // ]
    },
    {
        // label: 'Hierarchy',
        // items: [
        //     {
        //         label: 'Submenu 1',
        //         icon: 'pi pi-fw pi-bookmark',
        //         items: [
        //             {
        //                 label: 'Submenu 1.1',
        //                 icon: 'pi pi-fw pi-bookmark',
        //                 items: [
        //                     { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                     { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
        //                     { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
        //                 ]
        //             },
        //             {
        //                 label: 'Submenu 1.2',
        //                 icon: 'pi pi-fw pi-bookmark',
        //                 items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Submenu 2',
        //         icon: 'pi pi-fw pi-bookmark',
        //         items: [
        //             {
        //                 label: 'Submenu 2.1',
        //                 icon: 'pi pi-fw pi-bookmark',
        //                 items: [
        //                     { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                     { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
        //                 ]
        //             },
        //             {
        //                 label: 'Submenu 2.2',
        //                 icon: 'pi pi-fw pi-bookmark',
        //                 items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //             }
        //         ]
        //     }
        // ]
    },
    {
        // label: 'Get Started',
        // items: [
        //     {
        //         label: 'Documentation',
        //         icon: 'pi pi-fw pi-book',
        //         to: '/documentation'
        //     },
        //     {
        //         label: 'View Source',
        //         icon: 'pi pi-fw pi-github',
        //         url: 'https://github.com/primefaces/CON-MS',
        //         target: '_blank'
        //     }
        // ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
