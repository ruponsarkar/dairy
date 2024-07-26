import API from "./apiConfig";

export default {

    apiTesting() {
        return API.get('/api');
    },
    uploadDocument(fileData) {
        return API.post('/upload', { fileData });
    },
    getJournalWithId(id) {
        return API.get(`/getJournalWithId/${id}`);
    },

    // login 
    register(formData) {
        return API.post('/register', { formData });
    },

    login(email, password) {
        return API.post('/login', { email, password })
    }




}