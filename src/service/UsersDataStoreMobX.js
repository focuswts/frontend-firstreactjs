import axios from 'axios';
import { observable, autorun, action } from 'mobx';
import { timingSafeEqual } from 'crypto';


const API_URL = 'http://localhost:8080';
const USER_API_URL = `${API_URL}/users`;


class UsersDataStoreMobX {

    @observable users = [];

    constructor() {
        this.users = this.refreshUsers();
    }

    retrieveAllUsers() {
        return axios.get(`${USER_API_URL}/all`);
    }

    retrieveUser(id) {
        return axios.get(`${USER_API_URL}/find/${id}`);
    }

    deleteUser(id) {
        axios.delete(`${USER_API_URL}/delete/${id}`).then(
            (response) => {
                this.refreshUsers();
            },
            (err) => {
                console.log(err);
            })
    }

    updateUser(user) {
        return axios.post(`${USER_API_URL}/update`, user);
    }

    createUser(user) {
        return axios.post(`${USER_API_URL}/create`, user);
    }

    //Get All Users Method
    refreshUsers() {
        this.retrieveAllUsers().then(response => {
            this.users = response.data
        });
        //return this.users;
    }



}
const userStore = new UsersDataStoreMobX();
export default new UsersDataStoreMobX();