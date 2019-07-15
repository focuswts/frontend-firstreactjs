import axios from 'axios';
import { observable, autorun, action } from 'mobx';


const API_URL = 'http://localhost:8080';
const USER_API_URL = `${API_URL}/users`;


class UsersDataStoreMobX {

    @observable users = [];


    @action
    retrieveAllUsers() {
        return axios.get(`${USER_API_URL}/all`);
    }

    @action
    retrieveUser(id) {
        return axios.get(`${USER_API_URL}/find/${id}`);
    }

    @action
    deleteUser(id) {
        return axios.delete(`${USER_API_URL}/delete/${id}`);
    }

    @action
    updateUser(user) {
        return axios.post(`${USER_API_URL}/update`, user);
    }

    @action
    createUser(user) {
        return axios.post(`${USER_API_URL}/create`, user);
    }

    //Get All Users Method
    refreshUsers() {
        this.retrieveAllUsers().then(response => {
            this.users = response.data;
        });
    }



}
const userStore = new UsersDataStoreMobX();
export default new UsersDataStoreMobX();