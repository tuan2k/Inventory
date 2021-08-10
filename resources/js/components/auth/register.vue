<template>
    <div class="row justify-content-center">
    <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card shadow-sm my-5">
            <div class="card-body p-0">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="login-form">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Register</h1>
                            </div>
                            <form class="user" @submit.prevent="signup">
                                <div class="form-group">
                                    <input type="text" v-model="form.name" class="form-control" id="exampleInputLastName" placeholder="Enter Full Name">
                                    <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                                           placeholder="Enter Email Address" v-model="form.email">
                                    <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
                                </div>
                                <div class="form-group">
                                    <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword" placeholder="Password">
                                    <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" id="exampleInputPasswordRepeat"
                                           placeholder="Repeat Password" v-model="form.password_confirmation">
                                    <small class="text-danger" v-if="errors.password_confirm">{{ errors.password_confirm[0] }}</small>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary btn-block">Register</button>
                                </div>
                                <hr>
                                <a href="index.html" class="btn btn-google btn-block">
                                    <i class="fab fa-google fa-fw"></i> Register with Google
                                </a>
                                <a href="index.html" class="btn btn-facebook btn-block">
                                    <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                </a>
                            </form>
                            <hr>
                            <div class="text-center">
                                <router-link to="/" class="font-weight-bold small">Already have an account?</router-link>
                            </div>
                            <div class="text-center">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script type="text/javascript">
export default {
    name: "register",
    created() {
        if (User.loggedIn()) {
            this.$router.push({ name: 'home' })
        }
    },
    data(){
        return{
            form:{
                name : null,
                email: null,
                password: null,
                password_confirm: null
            },
            errors : {}
        }
    },
    methods: {
        signup(){
            axios.post('/api/auth/signup',this.form)
                .then(res => {
                    User.responseAfterLogin(res)
                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                    this.$router.push({ name: 'home'})
                })
                .catch(error => this.errors = error.response.data.errors)
        }
    }
}
</script>

<style scoped>

</style>
