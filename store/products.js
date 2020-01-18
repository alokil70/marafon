const URL = 'http://192.168.0.206:9000/message/'

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
    }
}

export const getters = {
    products: (s) => s.products
}
