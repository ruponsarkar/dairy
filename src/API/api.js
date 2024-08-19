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
    saveToMaster(data, user){
        return API.post('saveToMaster', {data, user});
    },
    getMaster(data){
        return API.post('getMaster', {data});
    },
    postMonthlyReport(data, month, amountPerLitter, approveBy){
        return API.post('postMonthlyReport', {data, month, amountPerLitter, approveBy});
    },
    updateMonthlyReport(data, month, amountPerLitter, approveBy){
        return API.post('updateMonthlyReport', {data, month, amountPerLitter, approveBy});
    },
    getMasterWithReport(month, district, user){
        return API.post('getMasterWithReport', {month, district, user});
    },
    getMonthlyReport(month){
        return API.post('getMonthlyReport', {month});
    },
    getRangeSubsidy(from, to, id, role){
        return API.post('getRangeSubsidy', {from, to, id, role});
    },
    individualMonthlyReport(formData){
        return API.post('individualMonthlyReport', {formData})
    },
    getIndividualMonthlyReport(id){
        return API.post('getIndividualMonthlyReport', {id})
    },
    saveGrievance(data){
        return API.post('saveGrievance', {data})
    },
    getGrievance(data){
        return API.post('getGrievance', {data})
    },
    // createDCS
    createDCS(formData){
        return API.post('/createDCS', {formData})
    },
    getAllDCS(){
        return API.post('/getAllDCS')
    },
    getApplicationStatisticsData_DistrictWise(selectedDistrict){
        let param = {
            disctrict: selectedDistrict
        }
        return API.post('/getApplicationStatisticsData_DistrictWise', {param})
    },
    getAllDCS_DistrictWise(selectedDistrict){
        let param = {
            disctrict: selectedDistrict
        }
        return API.post('/getAllDCS_DistrictWise', {param})
    },
    createFarmer(formData){
        return API.post('/createFarmer', {formData})
    },
    getAllFarmers(dsc){
        return API.post('/getAllFarmers', {dsc})
    },
    searchFarmer(search){
        return API.post('/searchFarmer', {search})
    },
    dcsData(){
        return API.post('/dcsData')
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
    },

    viewBeneficiary(data) {
        return API.post('/viewBeneficiary', { data });
    }


}