<template>
    <div>
        <div>
            {{ category[0].categoryName }}
        </div>
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
                                        <v-col cols="12" sm="6" md="10">
                                            <v-text-field
                                                v-model="editedItem.productName"
                                                label="Название"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="2">
                                            <v-text-field
                                                v-model.number="
                                                    editedItem.price
                                                "
                                                label="Цена"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-text-field
                                                v-model="editedItem.description"
                                                label="Описание"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.text"
                                                label="text"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.text1"
                                                label="text1"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.text2"
                                                label="text2"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-file-input
                                                ref="file"
                                                v-model="files"
                                                show-size
                                                label="Фото"
                                                >Фото
                                            </v-file-input>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="close" color="blue darken-1" text
                                    >Отмена
                                </v-btn>
                                <v-btn @click="save" color="blue darken-1" text
                                    >Добавить
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
    </div>
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
                sortable: false,
                value: 'productName'
            },
            { text: 'Text', value: 'text' },
            { text: 'Text1', value: 'text1' },
            { text: 'Text2', value: 'text2' },
            { text: 'Цена', value: 'price' },
            { text: 'Изменить', value: 'action', sortable: false }
        ],
        productsFormList: [],
        editedIndex: -1,
        files: null,
        editedItem: {
            productName: '',
            description: '',
            price: null,
            imageName: '',
            text: '',
            text1: '',
            text2: ''
        },
        defaultItem: {
            productName: '',
            description: '',
            price: null,
            imageName: '',
            text: '',
            text1: '',
            text2: ''
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Новое' : 'Edit Item'
        },
        products() {
            return this.$store.getters['products/products']
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
    async fetch({ store }) {
        if (store.getters['products/products'].length === 0) {
            await store.dispatch('products/fetch')
            // await store.dispatch('products/fetchCategory')
        }
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {},
        editItem(item) {
            this.editedIndex = this.productsFormList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            const index = this.productsFormList.indexOf(item)
            confirm('Are you sure you want to delete this item?') &&
                this.productsFormList.splice(index, 1)
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
                    this.productsFormList[this.editedIndex],
                    this.editedItem
                )
            } else {
                this.productsFormList.push(this.editedItem)

                const formData = new FormData()
                for (const item in this.editedItem) {
                    formData.append(item, this.editedItem[item])
                }
                formData.append('image', this.files)
                /* await this.$axios
                                .$post(
                                    'http://localhost:9090/api/products',
                                    formData
                                ) */
                this.$store.dispatch('products/objSave', formData)
                /* .then((response) => {
                                this.editedItem.imageName = response
                            }) */
            }
            // this.$store.dispatch('products/objSave', this.editedItem)
            this.close()
        }
    }
}
</script>

<style scoped></style>
