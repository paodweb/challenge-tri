<template>
    <TheHeading />
    <div class="races-list">
        <div class="mt-8 flow-root overflow-hidden">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <table class="w-full text-left">
                    <thead class="bg-white">
                        <tr>
                            <th scope="col" class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0">course</th>
                            <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">résultats</th>
                            <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"><span class="sr-only">résultats</span></th>
                            <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"><span class="sr-only">résultats</span></th>
                            <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="race in races" :key="race.email" class="even:bg-gray-50">
                            <td class="relative py-4 pr-3 text-lg font-medium text-gray-800">
                                <div class="md:flex md:items-center md:justify-between">
                                    <div class="min-w-0 flex">
                                        <router-link :to="`/race/${race.id}`">&nbsp;{{ race.name }}&nbsp;</router-link>
                                    </div>
                                    <div class="mt-4 flex md:ml-4 md:mt-0">
                                        <p class="text-sm text-gray-500">{{ race.date }}</p>
                                    </div>
                                    <div class="mt-4 flex-1 md:ml-4 md:mt-0">
                                        <a :href="race.link" class="ml-3 icon-link"><ArrowTopRightOnSquareIcon class="h-5 w-5 text-indigo-500" /></a>
                                    </div>
                                </div>
                            </td>
                            <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                                <dl class="flex w-full flex-none justify-between gap-x-8 items-center sm:w-auto">
                                    <div class="flex w-16 gap-x-2.5">
                                        <dt>🏃‍♀️🏃‍♂️</dt>
                                        <dd class="text-sm font-semibold leading-6 text-gray-900">{{ discussions[0].totalComments }}</dd>
                                    </div>
                                </dl>
                            </td>
                            <td class="px-3 py-4 text-sm text-gray-500">
                                Niveau <span class="text-sm font-semibold leading-6 text-gray-900">{{ discussions[0].totalComments }}</span>
                            </td>
                            <td class="px-3 py-4 text-sm text-gray-500">
                                Coefficient <span class="text-sm font-semibold leading-6 text-gray-900">{{ discussions[0].totalComments }}</span>
                            </td>
                            <td class="relative py-4 pl-3 text-right text-sm font-medium">
                                <div class="md:flex md:items-center md:justify-between">
                                    <div class="min-w-0 flex">
                                        <a href="#" class="text-indigo-600 hover:text-indigo-900">
                                            Edit<span class="sr-only">, {{ race.name }}</span>
                                        </a>
                                    </div>
                                    <div class="mt-4 flex-1 md:ml-4 md:mt-0">
                                        <router-link :to="`/race/${race.id}`">
                                            <ChevronRightIcon class="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                        </router-link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowTopRightOnSquareIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import TheHeading from '@/components/TheHeading.vue'
import { ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

const races = [
    {
        id: 12,
        name: 'Le trail aux pieds des Monts',
        date: '18-fév-2024',
        link: 'https://www.klikego.com/challenge/index.jsp?reference=1516144201179-4'
    },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
]

const discussions = [
    {
        id: 1,
        title: 'Atque perspiciatis et et aut ut porro voluptatem blanditiis?',
        href: '#',
        author: { name: 'Leslie Alexander', href: '#' },
        date: '2d ago',
        dateTime: '2023-01-23T22:34Z',
        status: 'active',
        totalComments: 18,
        commenters: [
            {
                id: 12,
                name: 'Emma Dorsey',
                imageUrl:
                    'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 6,
                name: 'Tom Cook',
                imageUrl:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 4,
                name: 'Lindsay Walton',
                imageUrl:
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 16,
                name: 'Benjamin Russel',
                imageUrl:
                    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                id: 23,
                name: 'Hector Gibbons',
                imageUrl:
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        ]
    }
]
</script>
