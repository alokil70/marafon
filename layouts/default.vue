<template>
    <v-app dark>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
        >
            <v-list>
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
                <v-expansion-panels focusable>
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
                </v-expansion-panels>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn @click.stop="miniVariant = !miniVariant" icon>
                <v-icon
                    >mdi-{{
                        `chevron-${miniVariant ? 'right' : 'left'}`
                    }}</v-icon
                >
            </v-btn>
            <v-btn @click.stop="clipped = !clipped" icon>
                <v-icon>mdi-application</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <v-btn @click.stop="rightDrawer = !rightDrawer" icon>
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            clipped: true,
            drawer: true,
            fixed: false,
            items: [
                {
                    icon: 'mdi-apps',
                    title: 'Блюда',
                    to: '/'
                },
                {
                    icon: 'mdi-apps',
                    title: 'Редактор',
                    to: '/addProducts'
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
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Ресторан'
        }
    }
}
</script>
