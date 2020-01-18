<template>
    <v-layout column justify-center align-center>
        <!--<v-flex xs12 sm8 md6>
            <div class="text-center"></div>
            <v-card v-for="product in products" :key="product.id">
                <v-card-title class="headline">
                    {{ product.text }}
                </v-card-title>
                <v-card-text>
                    <p>
                        Vuetify is a progressive Material Design component
                        framework for Vue.js. It was designed to empower
                        developers to create amazing applications.
                    </p>
                    <p>
                        If you have questions, please join the official
                        <a
                            href="https://chat.vuetifyjs.com/"
                            target="_blank"
                            title="chat"
                        >
                            discord </a
                        >.
                    </p>
                    <p>
                        Thank you for developing with Vuetify and I look forward
                        to bringing more exciting features in the future.
                    </p>
                    <div class="text-xs-right">
                        <em><small>&mdash; John Leider</small></em>
                    </div>
                    <hr class="my-3" />
                    <a href="https://nuxtjs.org/" target="_blank">
                        Nuxt Documentation
                    </a>
                    <br />
                    <a href="https://github.com/nuxt/nuxt.js" target="_blank">
                        Nuxt GitHub
                    </a>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" nuxt to="/inspire">
                        Continue
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>-->

        <v-hover v-slot:default="{ hover }">
            <v-card
                v-for="product in products"
                :key="product.id"
                class="mx-auto"
                color="grey lighten-4"
                max-width="600"
            >
                <v-img
                    :aspect-ratio="16 / 9"
                    src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                >
                    <v-expand-transition>
                        <div
                            v-if="hover"
                            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                            style="height: 100%;"
                        >
                            $14.99
                        </div>
                    </v-expand-transition>
                </v-img>
                <v-card-text class="pt-6" style="position: relative;">
                    <v-btn
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
                    <div class="font-weight-light grey--text title mb-2">
                        For the perfect meal
                    </div>
                    <h3 class="display-1 font-weight-light orange--text mb-2">
                        QW cooking utensils
                    </h3>
                    <div class="font-weight-light title mb-2">
                        Our Vintage kitchen utensils delight any chef.<br />
                        Made of bamboo by hand
                    </div>
                </v-card-text>
            </v-card>
        </v-hover>
    </v-layout>
</template>

<script>
export default {
    computed: {
        products() {
            return this.$store.getters['products/products']
        }
    },
    async fetch({ store }) {
        if (store.getters['products/products'].length === 0) {
            await store.dispatch('products/fetch')
        }
    }
}
</script>
<style scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    width: 100%;
}
</style>
