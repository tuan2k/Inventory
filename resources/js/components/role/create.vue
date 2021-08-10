<template>
    <div>
        <div class="row">
            <router-link to="/role" class="btn btn-primary">All Role</router-link>
        </div>

        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Add Role</h1>
                                    </div>
                                    <form class="user" @submit.prevent="roleInsert" >
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <input type="text" v-model="form.name" class="form-control" id="exampleInputLastName" placeholder="Enter Category Name">
                                                    <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">Submit</button>
                                        </div>
                                        <hr>
                                    </form>
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
    name: "create",
    created() {
        if (!User.loggedIn()) {
            this.$router.push({ name: '/' })
        }
    },
    data(){
        return{
            form:{
                name : null,
            },
            errors : {}
        }
    },
    methods: {
        roleInsert(){
            axios.post('/api/role',this.form)
                .then( () => {
                    this.$router.push({ name: 'role'});
                    Notification.success();
                })
                .catch(error => this.errors = error.response.data.errors);
        }
    }
}
</script>

<style scoped>

</style>
