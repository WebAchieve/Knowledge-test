import firebase from 'firebase/app'
export default {
    state: {
        storeTimer: {},
        userFinisTest: {}
    },
    mutations: {
        setTimer(state, time) {
            state.storeTimer = time
        },
        userFinisTest(state, test) {
            state.userFinisTest = test
        }

    },
    actions: {
        async setMinutes({ commit }, timerMinutes) {
            try {
                await firebase.database().ref('/timer').set({
                    timerMinutes,
                    endTimerMinutes: 0
                })

                commit('setTimer', timerMinutes,)

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async setEndMinutes({ commit, getters }, toUpdate) {
            try {
                const updateData = { ...getters.storeTimer, ...toUpdate }
                console
                await firebase.database().ref(`/timer`).update(updateData)
                commit('setTimer', updateData)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchMinutes({ commit }) {
            try {
                const time = (await firebase.database().ref(`timer`).once('value')).val()
                commit('setTimer', time)
                return time
            } catch (e) {
                commit('setError', e)
                throw e
            }

        },
        async finishTest({ commit, dispatch }, { questionsCount, count, questions }) {
            try {
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`/users/${uid}/usertest`).set({ questionsCount, count, questions })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchfinishTest({ commit, dispatch }) {
            try {
                const uid = await dispatch('getUid')
                return (await firebase.database().ref(`/users/${uid}/usertest`).once('value')).val() || {}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },


    },
    getters: {
        storeTimer: s => s.storeTimer,
        userFinisTest: s => s.userFinisTest
    }

}