<template>
    <v-data-table
        :headers="headers"
        :items="products"
        dense
        sort-by="calories"
        class="elevation-12"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Справочник</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" color="primary" small dark class="mb-2"
                            >Добавить
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.name"
                                            label="Dessert name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.calories"
                                            label="Calories"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.fat"
                                            label="Fat (g)"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.carbs"
                                            label="Carbs (g)"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.protein"
                                            label="Protein (g)"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="close" color="blue darken-1" text
                                >Cancel
                            </v-btn>
                            <v-btn @click="save" color="blue darken-1" text
                                >Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon @click="editItem(item)" small class="mr-2">
                edit
            </v-icon>
            <v-icon @click="deleteItem(item)" small>
                delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn @click="initialize" color="primary">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
export default {
    name: 'AddProducts',
    data: () => ({
        dialog: false,
        headers: [
            {
                text: 'Название',
                align: 'left',
                sortable: true,
                value: 'text'
            },
            { text: 'Calories', value: 'calories' },
            { text: 'Fat (g)', value: 'fat' },
            { text: 'Carbs (g)', value: 'carbs' },
            { text: 'Цена', value: 'text1' },
            { text: 'Изменить', value: 'action', sortable: false }
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        products() {
            return this.$store.getters['products/products']
        }
    },
    watch: {
        dialog(val) {
            val || this.close()
        }
    },
    async fetch({ store }) {
        if (store.getters['products/products'].length === 0) {
            await store.dispatch('products/fetch')
        }
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            console.log('reeegggfd')
        },
        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') &&
                this.desserts.splice(index, 1)
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        }
    }
}
</script>

<style scoped></style>
