<template>
  <div class="home col-8 mx-auto py-5 mt-5">
    <div class="card">
      <div class="card-body" v-if="user">
        <div class="row">
          <div class="col-8">
            <h3>Olá, {{ user.name }}</h3>
          </div>
          <div class="col-4" style="text-align: right">
            <span>{{ user.email }}</span>
          </div>
        </div>            
        <br>
        <div style="height: 600px; overflow-y: auto;">
            <h3 class="text-center">Seus Certificados:</h3>
            <div class="btn-group" role="group">
              <button class="btn btn-success" @click="createCertificate()">Novo certificado</button>
            </div>
            <table id="tabela" class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Expira em</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="certificate in certificates.data" :key="certificate.id">
                        <td>{{ certificate.id }}</td>
                        <td @click="showCertificate(certificate.id)" style="cursor:pointer">{{ certificate.dn }}</td>
                        <td>{{ certificate.expiration_date | formatDate }}</td>
                        <td>
                            <div class="btn-group mr-1" role="group">
                                <button class="btn btn-warning" @click="editCertificate(certificate.id)">Alterar</button>
                            </div>
                            <div class="btn-group" role="group">
                                <button class="btn btn-danger" @click="deleteCertificate(certificate.id)">Excluir</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
import Certificate from "../apis/Certificate";	
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  data() {
    return {
      certificates: []
    }
  },

  mounted() {
    User.auth().then(response => {
      this.$store.commit("AUTH_USER", response.data);
    });
    Certificate.get().then(response => {
      this.certificates = response.data;
    });
  },
  methods: {
    createCertificate() {
      this.$router.push({ name: "FormCertificate" });
    },
    showCertificate(id) {
      this.$router.push({ name: "Certificate" , params: { id: id }});
    },
    editCertificate(id) {
      this.$router.push({ name: "FormCertificate" , params: { id: id }});
    },
    deleteCertificate(id) {
      Certificate.delete(id)
        .then(() => {
          Certificate.get().then(response => {
            this.certificates = response.data;
          });
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });      
    }
  }
};
</script>
