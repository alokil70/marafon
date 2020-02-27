<template>
    <v-layout row justify-center>
        <v-row class="flex" justify="center">
            <v-card
                :loading="loading"
                v-for="p in products"
                :key="p.id"
                class="mx-auto my-3"
                max-width="374"
                elevation="24"
                shaped
            >
                <v-img :src="`${URL_IMG}${p.imageName}`" height="350">
                    <v-col class="white--text text-left lightbox" cols="12">
                        <h1 class="display-1 font-weight-light mb-2">
                            {{ p.productName }}
                        </h1>
                        <h4 class="subheading">{{ p.price }} Р</h4>
                    </v-col>
                    <!--<v-card-title v-text="p.productName" />
                    <v-card-title v-text="p.price + ' Рублей'" />-->
                </v-img>

                <v-card-text class="pt-6" style="position: relative;">
                    <v-btn
                        @click="reserve"
                        absolute
                        color="orange"
                        class="white--text"
                        fab
                        large
                        right
                        top
                    >
                        <v-icon>mdi-cart</v-icon>
                    </v-btn>
                    <v-row align="center" class="mx-0">
                        <v-rating
                            :value="4.5"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                        ></v-rating>

                        <div class="grey--text ml-4">4.5 (413)</div>
                    </v-row>
                    <i v-text="p.description" class="text-small"></i>

                    <!--<div class="my-4 subtitle-1 black&#45;&#45;text">
                        {{ p.text1 }}
                    </div>-->
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-title>Доступно для заказа</v-card-title>

                <v-card-text>
                    <v-chip-group
                        v-model="selection"
                        active-class="deep-purple accent-4 white--text"
                        column
                    >
                        <v-chip>21:00</v-chip>

                        <v-chip>21:20</v-chip>

                        <v-chip>21:30</v-chip>

                        <v-chip>21:40</v-chip>

                        <v-chip>21:50</v-chip>
                    </v-chip-group>
                </v-card-text>

                <v-card-actions>
                    <!--<v-btn @click="reserve" color="orange" text>
                        Заказать
                    </v-btn>-->
                </v-card-actions>
            </v-card>
        </v-row>
    </v-layout>
</template>

<script>
import { URL_IMG } from '../assets/constants'

export default {
    data: () => ({
        URL_IMG,
        loading: false,
        selection: 1
    }),
    computed: {
        products() {
            return this.$store.getters['products/products']
        },
        category() {
            return this.$store.getters['products/category']
        }
    },
    async fetch({ store }) {
        if (store.getters['products/products'].length === 0) {
            await store.dispatch('products/fetch')
            // await store.dispatch('products/fetchCategory')
        }
    },
    methods: {
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        }
    }
}
</script>

<style lang="scss">
.text__name {
    text-shadow: #ffffff;
    background-color: #562b00;
}
.lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.4) 0%,
        transparent 72px
    );
}
</style>
