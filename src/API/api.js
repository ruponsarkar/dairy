import API from "./apiConfig";
import uploadAPI from "./uploadApiConfig";

export default {

    apiTesting() {
        return API.get('/api');
    },
    saveForm(formData){
        return API.post('/saveForm', {formData});
    },
    uploadDocument(formData) {
        return uploadAPI.post('/upload', formData);
    },
    getFormByMobileNumber(data){
        return API.post('/getFormByMobileNumber', {data});
    },
    addOrUpdateAdmin(formData){
        return API.post('/addOrUpdateAdmin', {formData})
    },
    getAdmins(){
        return API.get('/getAdmins')
    },

    // login 
    register(formData) {
        return API.post('/register', { formData });
    },

    login(email, password) {
        return API.post('/login', { email, password })
    }




}