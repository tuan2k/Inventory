<template>
    <div>
        <div class="row">
            <router-link to="/category" class="btn btn-primary">All Categories</router-link>
        </div>

        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Update Expense</h1>
                                    </div>
                                    <form class="user" @submit.prevent="expenseUpdate">
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <textarea v-model="form.details" class="form-control" id="exampleInputLastName" placeholder=" Enter Details"></textarea>
                                                    <small class="text-danger" v-if="errors.details">{{ errors.details[0] }}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <input type="text" v-model="form.amount" class="form-control" id="exampleInputAmount" placeholder=" Enter Amount">
                                                    <small class="text-danger" v-if="errors.amount">{{ errors.amount[0] }}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">Update</button>
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
    name: "edit",
    created() {
        if (!User.loggedIn()) {
            this.$router.push({ name: '/' })
        }
        let id =  this.$route.params.id
        axios.get('/api/expense/'+id)
            .then( ({data}) => (this.form = data))
            .catch( error => {
                console.log(error)
            })
    },
    data(){
        return{
            form:{
                details : '',
                amount : '',
            },
            errors: {}
        }
    },
    methods: {
        expenseUpdate(){
            let id =  this.$route.params.id
            axios.patch('/api/expense/'+id,this.form)
                .then( () => {
                    this.$router.push({ name: 'expense'});
                    Notification.success();
                })
                .catch(error => this.errors = error.response.data.errors);
        },
        onFileSelected(event){
            let file = event.target.files[0];
            if (file.size > 1048770) {
                Notification.image_validation()
            }else{
                let reader = new FileReader();
                reader.onload = event => {
                    this.form.new_photo = event.target.result
                };
                reader.readAsDataURL(file);
            }
        }
    }
}
</script>

<style scoped>

</style>
