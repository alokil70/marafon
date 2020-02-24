<template>
    <v-app dark>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            mobile-break-point="1367"
            fixed
            width="200"
            app
        >
            <v-list dense nav class="py-0">
                <v-list-item :class="miniVariant && 'px-0'" two-line>
                    <v-list-item-avatar>
                        <img
                            src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                        />
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Приложение</v-list-item-title>
                        <v-list-item-subtitle>Марафон</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    link
                    router
                    exact
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <!--<v-list dense rounded>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>



            </v-list>-->
            <!--<v-expansion-panels focusable>
                    <v-expansion-panel v-for="(item, i) in 5" :key="i">
                        <v-expansion-panel-header
                            >Item</v-expansion-panel-header
                        >
                        <v-expansion-panel-content>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>-->
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <!--<v-btn @click.stop="miniVariant = !miniVariant" icon>
                <v-icon
                    >mdi-{{
                        `chevron-${miniVariant ? 'right' : 'left'}`
                    }}</v-icon
                >
            </v-btn>
            <v-btn @click.stop="clipped = !clipped" icon>
                <v-icon>mdi-application</v-icon>
            </v-btn>-->
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <v-tabs color="deep-purple" right>
                <v-tab>Салаты</v-tab>
                <v-tab>Кофе</v-tab>
                <v-tab>Кухня</v-tab>
            </v-tabs>
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                transition="slide-x-transition"
            >
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" color="deep-purple" dark text>
                        Меню
                    </v-btn>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                                <img
                                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                                    alt="John"
                                />
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>Повар</v-list-item-title>
                                <v-list-item-subtitle
                                    >режим
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn
                                    :class="fav ? 'red--text' : ''"
                                    @click="fav = !fav"
                                    icon
                                >
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                        <v-list-item>
                            <v-list-item-action>
                                <v-switch
                                    v-model="message"
                                    color="purple"
                                ></v-switch>
                            </v-list-item-action>
                            <v-list-item-title
                                >Включить ообщения
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-action>
                                <v-switch
                                    v-model="hints"
                                    color="purple"
                                ></v-switch>
                            </v-list-item-action>
                            <v-list-item-title>Режим повара</v-list-item-title>
                        </v-list-item>
                    </v-list>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn @click="menu = false" text>Отмена</v-btn>
                        <v-btn @click="menu = false" color="deep-purple" text
                            >Запомнить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
            <!--<v-btn @click.stop="rightDrawer = !rightDrawer" icon>
                <v-icon>mdi-menu</v-icon>
            </v-btn>-->
        </v-app-bar>
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>
        <v-footer fixed elevation="12" height="30" width="100">
            <span>&copy; 2020</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            clipped: true,
            drawer: false,
            fixed: false,
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Ресторан',
            fav: true,
            menu: false,
            message: false,
            hints: true,
            items: [
                {
                    icon: 'mdi-apps',
                    title: 'Блюда',
                    to: '/'
                },
                {
                    icon: 'mdi-apps',
                    title: 'Блюда1',
                    to: '/productsList'
                },
                {
                    icon: 'mdi-apps',
                    title: 'Редактор',
                    to: '/addProducts'
                },
                {
                    icon: 'mdi-apps',
                    title: 'Категории',
                    to: '/categoryEdit'
                },
                {
                    icon: 'mdi-apps',
                    title: 'expansion panel',
                    to: '/expansion-panel'
                },
                {
                    icon: 'mdi-chart-bubble',
                    title: 'Inspire',
                    to: '/inspire'
                }
            ]
        }
    }
}
</script>
