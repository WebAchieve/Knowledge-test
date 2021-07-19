import firebase from 'firebase/app'
export default {
    actions:{
        async fetchUsers({commit}){
            try{
                const users = (await firebase.database().ref(`/users`).once('value')).val() || {}
                
               return  Object.keys(users).map(key => ({...users[key],id:key}))
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
        async fetchUsersById({commit},id){
            try{
                let record = (await firebase.database().ref(`/users/${id}`).child('usertest').once('value')).val() || {}
               return  record.questions
               
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
        async deletUserTest({commit},id){
            try{
            await firebase.database().ref(`/users/${id}`).child('usertest').remove() 
               console.log(id)
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
      
 
    }
   

}