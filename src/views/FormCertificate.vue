<template>
  <div class="home col-8 mx-auto py-5 mt-5">
    <div class="card">
      <div class="card-body">
        <br>
        <div v-if="certificate.data">
            <h3 class="text-center">Alterar Certificado {{ certificate.data.id }}:</h3>            
        </div>
        <div v-else>
            <h3 class="text-center">Novo Certificado</h3>            
        </div>
        <form>
            <div class="mb-12">
                <label for="file" class="form-label">Arquivo do certificado</label>
                <input type="file" class="form-control" id="file" ref="file" v-on:change="handleFileUpload()">
                <div id="fileHelp" class="form-text text-right text-danger">Arquivos suportados: *.pem</div>
                <span class="text-danger" v-if="errors">
                    {{ errors[0] }}
                </span>
            </div><br>                            
            <div class="text-right">                                
                <button v-if="certificate.data" type="submit" @click.prevent="editCertificado(certificate.data.id)" class="btn btn-lg btn-success">Alterar</button>
                <button v-else type="submit" @click.prevent="newCertificado()" class="btn btn-lg btn-success">Enviar</button>
            </div>
            <a href="#" @click="Inicio()">Voltar</a>
        </form>
        
      </div>
    </div>
  </div>
</template>

<script>
import Certificate from "../apis/Certificate";	

export default {
  data() {
    return {
      certificate: {},
      form:{
          file : ""
      },
      errors : [],
      file: ''
    }
  },
  mounted() {    
    if(this.$route.params.id) {
      Certificate.mostra(this.$route.params.id).then(response => {
        this.certificate = response.data;      
      })
      .catch(error => {          
        console.log(error.response);          
      });
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.form.file = this.file;
    },
    Inicio() {
      this.$router.push({ name: "Dashboard" });
    },
    newCertificado() {
      if(this.file==''){
        this.errors.push("Arquivo não selecionado");
        return;
      }
      let formData = new FormData();
      formData.append('file', this.file);
      Certificate.register(formData).then(() => {
        this.$router.push({ name: "Dashboard" });
      })
      .catch(error => {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      });
    },
    editCertificado(id) {
      if(this.file==''){
        this.errors.push("Arquivo não selecionado");
        return;
      }
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('_method', 'PUT');
      Certificate.atualiza(formData,id).then(() => {
        this.$router.push({ name: "Dashboard" });
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
