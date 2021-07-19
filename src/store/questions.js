import firebase from 'firebase/app'
export default {


    actions: {
        async createQuestions({ commit }, { question, answers, corect }) {
            try {
                await firebase.database().ref(`/question`).push({ question, answers, corect })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchQuestions({ commit }) {
            try {
                const res = (await firebase.database().ref(`/question`).once('value')).val() || {}

                const questions = Object.keys(res).map((key, index) => ({ ...res[key], index, id: key }))
                commit('setQuestions', questions)

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateQuestions({ commit }, { question, answers, id }) {
            try {
                await firebase.database().ref(`/question`).child(id).update({ question, answers })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

    },
    mutations: {
        setQuestions(state, fetchQuestions) {
            state.stateQuestions = fetchQuestions
        },
        removeQuestion(state, { id }) {
            firebase.database().ref(`/question/${id}`).remove()
        },

    },
    state: {
        stateQuestions: {}
    },
    getters: {
        renderQuestions: s => s.stateQuestions
    },

}