import Api from "./Api";

export default {
    register(form) {
        return Api().post("/certificates", form,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }});
    },

    atualiza(form, id) {
        return Api().post(`/certificates/${id}`, form,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }});
    },

    get() {
        return Api().get("/certificates");
    },

    mostra(id) {
        return Api().get(`/certificates/${id}`);
    },

    delete(id) {
        return Api().delete(`/certificates/${id}`);
    }



};