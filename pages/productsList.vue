<template>
    <v-layout row justify-center align-center>
        <v-row class="flex" justify="center">
            <v-card
                v-for="p in products"
                :key="p.id"
                :ripple="true"
                @click="show"
                :img="`${URL_IMG}${p.imageName}`"
                elevation="24"
                height="400px"
                class="portrait"
                >{{ p.productName }}</v-card
            >
        </v-row>

        <v-menu
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            absolute
            offset-y
        >
            <v-list>
                <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    @click=""
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-layout>
</template>

<script>
import { URL_IMG } from '../assets/constants'

export default {
    data: () => ({
        URL_IMG,
        showMenu: false,
        x: 0,
        y: 0,
        items: [
            { title: 'Что-то' },
            { title: 'Какой-то выбор' },
            { title: 'Что-нибуть' },
            { title: 'И это ))' }
        ]
    }),
    computed: {
        products() {
            return this.$store.getters['products/products']
        }
    },
    async fetch({ store }) {
        if (store.getters['products/products'].length === 0) {
            await store.dispatch('products/fetch')
        }
    },
    methods: {
        show(e) {
            e.preventDefault()
            this.showMenu = false
            this.x = e.clientX
            this.y = e.clientY
            this.$nextTick(() => {
                this.showMenu = true
            })
        }
    }
}
</script>

<style scoped>
.portrait.v-card {
    margin: 16px auto;
    max-width: 400px;
    width: 100%;
    text-shadow: #47494e;
    text-anchor: end;
    text-overline-color: #47494e;
    font-size: large;
}
</style>
