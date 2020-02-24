<template>
    <v-data-table
        :headers="headers"
        :items="category"
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
                        <v-btn
                            v-on="on"
                            color="deep-purple"
                            small
                            dark
                            class="mb-2"
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
                                            v-model="editedItem.categoryName"
                                            label="название"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.description"
                                            label="Calories"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.imageName"
                                            label="Fat (g)"
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
    name: 'CategoryEdit',
    data: () => ({
        dialog: false,
        headers: [
            {
                text: 'Название',
                align: 'left',
                sortable: false,
                value: 'categoryName'
            },
            { text: 'Описание', value: 'description' },
            { text: 'не знаю', value: 'fat' },
            { text: 'Изменить', value: 'action', sortable: false }
        ],
        categoryFormList: [],
        editedIndex: -1,
        editedItem: {
            categoryName: '',
            description: '',
            imageName: ''
        },
        defaultItem: {
            categoryName: '',
            description: '',
            imageName: ''
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Добавить категорию' : 'Edit Item'
        },
        category() {
            return this.$store.getters['products/category']
        }
    },
    watch: {
        dialog(val) {
            val || this.close()
        }
    },
    fetch({ store }) {
        if (store.getters['products/products'].length === 0) {
            store.dispatch('products/fetch')
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
            this.editedIndex = this.categoryFormList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            const index = this.categoryFormList.indexOf(item)
            confirm('Are you sure you want to delete this item?') &&
                this.desserts.splice(index, 1)
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
            this.$store.dispatch('products/fetch')
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(
                    this.categoryFormList[this.editedIndex],
                    this.editedItem
                )
            } else {
                this.categoryFormList.push(this.editedItem)
                this.$store.dispatch('products/categorySave', this.editedItem)
            }
            this.close()
        }
    }
}
</script>

<style scoped></style>
