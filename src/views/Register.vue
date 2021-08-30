<template>
  <div class="home col-5 mx-auto py-5 mt-5">
    <h1 class="text-center">Registrar</h1>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="name">Seu nome:</label>
          <input
            type="text"
            v-model="form.name"
            class="form-control"
            id="name"
          />
          <span class="text-danger" v-if="errors.name">
            {{ errors.name[0] }}
          </span>
        </div>
        <div class="form-group">
          <label for="email">Seu Email:</label>
          <input
            type="email"
            v-model="form.email"
            class="form-control"
            id="email"
          />
          <span class="text-danger" v-if="errors.email">
            {{ errors.email[0] }}
          </span>
        </div>
        <div class="form-group">
          <label for="password">Sua senha:</label>
          <input
            type="password"
            v-model="form.password"
            class="form-control"
            id="password"
          />
          <span class="text-danger" v-if="errors.password">
            {{ errors.password[0] }}
          </span>
        </div>
        <div class="form-group">
          <label for="password_confirmation">Repita a senha:</label>
          <input
            type="password"
            v-model="form.password_confirmation"
            class="form-control"
            id="password_confirmation"
          />
          <span class="text-danger" v-if="errors.password_confirmation">
            {{ errors.password_confirmation[0] }}
          </span>
        </div>
        <div class="form-group">
          <label for="cpf">Seu CPF:</label>
          <input
            type="number"
            v-model="form.cpf"
            class="form-control"
            id="cpf"
          />
          <span class="text-danger" v-if="errors.cpf">
            {{ errors.cpf[0] }}
          </span>
        </div>
        <div class="form-group">
          <label for="born_date">Sua Data de Nascimento:</label>
          <input
            type="date"
            v-model="form.born_date"
            class="form-control"
            id="born_date"
          />
          <span class="text-danger" v-if="errors.born_date">
            {{ errors.born_date[0] }}
          </span>
        </div>
        <div class="form-group">
          <label for="address">Seu Endereço completo:</label>
          <input
            type="text"
            v-model="form.address"
            class="form-control"
            id="address"
          />
          <span class="text-danger" v-if="errors.address">
            {{ errors.address[0] }}
          </span>
        </div>
        <button
          type="submit"
          @click.prevent="register"
          class="btn btn-primary btn-block"
        >
          Registrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        cpf: "",
        born_date: "",
        address: ""
      },
      errors: []
    };
  },

  methods: {
    register() {
      User.register(this.form).then(() => {
        this.$router.push({ name: "Login" });
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
