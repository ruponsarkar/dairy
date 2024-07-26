import API from "./apiConfig";

export default {

    apiTesting() {
        return API.get('/api');
    },
    uploadDocument(fileData) {
        return API.post('/upload', { fileData });
    },
    saveForm(formData){
        return API.post('/saveForm', {formData});
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