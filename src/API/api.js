import API from "./apiConfig";

export default {


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
    getFrom(data){
        return API.get(`/getFrom?limit=${data.limit}&offset=${data.offset}`)
    },





    // login 
    register(formData) {
        return API.post('/register', { formData });
    },

    login(email, password) {
        return API.post('/login', { email, password })
    }




}