import API from "./apiConfig";

export default {

    getJournal() {
        return API.get('/getJournal');
    },
    getJournalForPub() {
        return API.get('/getJournalForPub');
    },
    getJournalWithId(id) {
        return API.get(`/getJournalWithId/${id}`);
    },
    getPublisherWithId(id) {
        return API.get(`/getPublisherWithId/${id}`);
    },
    getCategoryWithId(id) {
        return API.get(`/getCategoryWithId/${id}`);
    },
    getArticle(id) {
        return API.get(`/getArticle/${id}`);
    },
    getCategory() {
        return API.get('/getCategory');
    },
    getPublisher() {
        return API.get('/getPublisher');
    },

    postCategory(formData, id) {
        return API.post('/postCategory', { formData, id });
    },
    postPublisher(formData) {
        return API.post('/postPublisher', { formData });
    },
    handleExclusive(data, id) {
        return API.post('/handleExclusive', { data, id });
    },


    submitContactUs(formdata) {
        return API.post('/submitContactUs', { formdata });
    },
    getContactData() {
        return API.get('/getContactData');
    },
    getLink() {
        return API.get('/getLink');
    },
    postLink(link) {
        return API.post('/postLink', { link });
    },

    linkDisable(id, status) {
        return API.post('/linkDisable', { id, status });
    },

    saveColor(headcolor, titlecolor) {
        return API.post('/saveColor', { headcolor, titlecolor });
    },
    getHeadlineColor() {
        return API.get('/getHeadlineColor');
    },
    countData() {
        return API.get('/countData');
    },
    deleteJournal(id) {
        return API.post('/deleteJournal', { id });
    },
    updateBio(bio) {
        return API.post('/updateBio', { bio });
    },






    // login 
    register(formData) {
        return API.post('/register', { formData });
    },

    login(email, password) {
        return API.post('/login', { email, password })
    }




}