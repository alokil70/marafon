import { URL } from '../assets/constants'

export const state = () => ({
    products: [],
    category: []
})

export const mutations = {
    setProducts(state, products) {
        state.products = products
    },
    setCategory(state, category) {
        state.category = category
    }
}

export const actions = {
    async fetch({ commit }) {
        const products = await this.$axios.$get(URL + '/products')
        commit('setProducts', products)
        const category = await this.$axios.$get(URL + '/category')
        commit('setCategory', category)
    },
    async objSave({ commit }, postData) {
        await this.$axios.$post(URL + '/products', postData)
    },
    async categorySave({ commit }, postData) {
        await this.$axios.$post(URL + '/category', postData)
    },
    async productDelete({ commit }, productId) {
        await this.$axios.$post(URL + '/products/delete/' + productId)
    }
}

export const getters = {
    products: (s) => s.products,
    category: (s) => s.category
}
