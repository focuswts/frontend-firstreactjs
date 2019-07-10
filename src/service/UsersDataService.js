import axios from 'axios';


const API_URL = 'http://localhost:8080';
const USER_API_URL = `${API_URL}/users`;

class UserDataService {

    retrieveAllUsers() {
        return axios.get(`${USER_API_URL}/all`);
    }

    retrieveUser(id) {
        return axios.get(`${USER_API_URL}/find/${id}`);
    }

    deleteUser(id) {
        return axios.delete(`${USER_API_URL}/delete/${id}`);
    }

    updateUser(user) {
        return axios.post(`${USER_API_URL}/update`, user);
    }

    createUser(user) {
        return axios.post(`${USER_API_URL}/create`, user);
    }

}

export default new UserDataService();