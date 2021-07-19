import firebase from 'firebase/app'

export default {
    actions: {
        async Login({ commit }, { email, password }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async Register({ dispatch, commit }, { email, password, name }) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')

                await firebase.database().ref(`/users/${uid}`).set({
                    name: name
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout() {
            await firebase.auth().signOut()

        }

    }
}
