import { URL } from '../assets/constants'

export const state = () => ({
    products: []
})

export const mutations = {
    setProducts(state, products) {
        state.products = products
    }
}

export const actions = {
    async fetch({ commit }) {
        const products = await this.$axios.$get(URL)
        commit('setProducts', products)
    },
    async objSave({ commit }, postData) {
        await this.$axios.$post(URL, postData)
    }
}

export const getters = {
    products: (s) => s.products
}
