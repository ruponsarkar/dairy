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
    getFrom(data){
        return API.post(`/getFrom`, {data})
    },
    updateFormStatus(data){
        return API.post('/updateFormStatus', {data})
    },
    countStatus(){
        return API.get('countStatus');
    },
    saveToMaster(data){
        return API.post('saveToMaster', {data});
    },
    getMaster(data){
        return API.post('getMaster', {data});
    },
    postMonthlyReport(data, month, amountPerLitter){
        return API.post('postMonthlyReport', {data, month, amountPerLitter});
    },
    getMasterWithReport(month){
        return API.post('getMasterWithReport', {month});
    },
    getMonthlyReport(month){
        return API.post('getMonthlyReport', {month});
    },
    getRangeSubsidy(from, to){
        return API.post('getRangeSubsidy', {from, to});
    },




    // login 
    register(formData) {
        return API.post('/register', { formData });
    },

    login(email, password) {
        return API.post('/login', { email, password })
    },


    // Payment 

    createBeneficiary(data) {
        return API.post('/createBeneficiary', { data });
    }


}