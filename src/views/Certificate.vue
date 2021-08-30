<template>
  <div class="home col-8 mx-auto py-5 mt-5">
    <div class="card">
      <div class="card-body">
        <br>
        <div v-if="certificate.data">
            <h3 class="text-center">Certificado {{ certificate.data.id }}:</h3>
            <div class="row">
                <div class="col-10">
                    <h5>Nome:</h5>
                    <p>{{ certificate.data.dn }}</p>
                </div>
                <div class="col-2">
                    <h5>Validade:</h5>
                    <p>{{ certificate.data.expiration_date }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h5>Emissor:</h5>
                    <p>{{ certificate.data.issuer_dn }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 class="text-center">Novo Certificado</h3>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <a href="#" @click="Inicio()">Voltar</a>
      </div>
    </div>
  </div>
</template>

<script>
import Certificate from "../apis/Certificate";	

export default {
  data() {
    return {
      certificate: {}
    }
  },

  mounted() {    
    Certificate.mostra(this.$route.params.id).then(response => {
      this.certificate = response.data;      
    })
    .catch(error => {          
        this.errors = error.response.data.errors;
    });
  },
  methods: {
    Inicio() {
      this.$router.push({ name: "Dashboard" });
    }
  }
};
</script>
