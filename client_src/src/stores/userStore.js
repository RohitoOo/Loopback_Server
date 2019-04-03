import { observable, action, decorate } from "mobx"
// import { GQL, CREATE_USER, UPDATE_USER, ALL_USERS } from "../api"
import { toJS } from "mobx"
import axios from "axios"
import _ from "lodash"
import uuid from "uuid"
class UserStore {
  currentUser = { email: "rohito.com", partnerId: "" }
  loading = false
  //   userRoles = { admin: "a512e888-b204-4bea-ad73-798811dbfbb6" } // temporary
  //   users = []

  //   constructor() {
  //     Hub.listen("auth", this, "UserStoreListener")
  //   }

  setUser = user => {
    this.currentUser = { ...user }
  }

  // Set User After Users Registers / Login

  //   setUser = async input => {
  //     localStorage.setItem("currentUser", JSON.stringify(input))
  //     this.currentUser = input
  //     // return Promise.resolve()
  //   }

  saveUser = async input => {
    try {
      const newUserId = uuid.v4()
      const newPartnerId = uuid.v4()
      const newGatewayId = uuid.v4()
      const newServerId = uuid.v4()

      function createNewGateway() {
        return axios.post("http://localhost:3000/api/gateways", {
          id: newGatewayId,
          name: `BHAMBHANIIIIIII-${newGatewayId}`,
          ip: "0.0.0.0"
        })
      }
      function createNewPartner() {
        return axios.post("http://localhost:3000/api/partners", {
          id: newPartnerId,
          name: `BHAMBHANIIIIIII-${newPartnerId}`,
          gateway_id: newGatewayId
        })
      }
      function createNewServer() {
        return axios.post("http://localhost:3000/api/servers", {
          id: newServerId,
          ports: null
        })
      }

      function createNewUser() {
        return axios.post("http://localhost:3000/api/users", {
          id: newUserId,
          email: input.email,
          phone: 911,
          partner_id: newPartnerId,
          server_id: newServerId,
          username: input.username
        })
      }
      createNewGateway().then(() =>
        createNewPartner().then(() =>
          createNewServer().then(() => createNewUser())
        )
      )
    } catch (err) {
      console.log({ err })
    }
  }

  // Invite User By Updating The Partner_Id

  updateUser = async user => {
    this.loading = true
    await axios.post("http://localhost:4000/updateuser", {
      user
    })
    this.loading = false
  }

  getAllUsers = async partner_id => {
    const users = await axios.post("http://localhost:4000/getallusers", {
      partner_id
    })

    return users
  }

  //   loadUser = async () => {
  //     this.loading = true
  //     this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
  //   }

  //   /**
  //    * All Partner Users
  //    * @name All Partner Users
  //    * @return {Promise.<null>} empty promise
  //    */
  //   getAllUsers = async () => {
  //     this.loading = true
  //     try {
  //       const { partnerId } = this.currentUser
  //       const {
  //         data: { User: users }
  //       } = await GQL.query({ query: ALL_USERS, variables: { partnerId } })
  //       this.users = [...users]
  //       this.loading = false
  //       return Promise.resolve()
  //     } catch (error) {
  //       this.loading = false
  //       return Promise.reject(error)
  //     }
  //   }

  //   /**
  //    * Invites (Creates) a User
  //    * @name Get Users Invite User
  //    * @param {string} userRoleId
  //    * @param {string} firstName
  //    * @param {string} lastName
  //    * @param {string} email
  //    * @param {string} accountStatus
  //    * @return {Promise.<null>} empty promise
  //    */
  //   inviteUser = async input => {
  //     this.loading = true
  //     const { partnerId, id: fromUserId } = this.currentUser
  //     const payload = { ...input, partnerId, fromUserId }
  //     try {
  //       const {
  //         data: {
  //           insert_User: {
  //             returning: [user]
  //           }
  //         }
  //       } = await GQL.mutate({
  //         mutation: CREATE_USER,
  //         variables: { input: [payload] }
  //       })
  //       const { id, userRole } = user
  //       this.users = [...this.users, { ...input, id, userRole }]
  //       this.loading = false
  //       return Promise.resolve()
  //     } catch (error) {
  //       this.loading = false
  //       return Promise.reject(error)
  //     }
  //   }

  //   /**
  //    * Updates a User
  //    * @name Update User
  //    * @param {string} id
  //    * @param {Object} changes - an object containing props for change
  //    * @return {Promise.<null>} empty promise
  //    */
  //   updateUser = async (id, changes) => {
  //     this.loading = true
  //     try {
  //       await GQL.mutate({
  //         mutation: UPDATE_USER,
  //         variables: { id, changes }
  //       })
  //       this.users = _.map(this.users, u => {
  //         if (u.id == id) {
  //           return { ...u, ...changes }
  //         } else {
  //           return u
  //         }
  //       }) //[...this.users, { ...input, id, userRole }]
  //       this.loading = false
  //       return Promise.resolve()
  //     } catch (error) {
  //       this.loading = false
  //       return Promise.reject(error)
  //     }
  //   }

  //   /**
  //    * Update Patner Info. Only really
  //    * @name Update Patner Info
  //    * @param {Object} partnerProps
  //    * @param {string} partnerProps.partnerName
  //    * @return {Promise.<null>} empty promise
  //    */
  //   updatePartnerInfo = partnerProps => {
  //     const currentUser = { ...this.currentUser, ...partnerProps }
  //     localStorage.setItem("currentUser", JSON.stringify(currentUser))
  //     this.currentUser = currentUser
  //   }

  logout = async () => {
    // await Auth.signOut({ global: true })
    // this.currentUser = undefined
    // return Promise.resolve()
  }

  //   usersToJS = () => {
  //     return toJS(this.users)
  //   }
}

decorate(UserStore, {
  currentUser: observable,
  updateUser: action,
  saveUser: action,
  setUser: action,
  getAllUsers: action,
  loading: observable
})

export default new UserStore()
