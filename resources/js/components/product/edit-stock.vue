<template>
    <div>
        <div class="row">
            <router-link to="/stock" class="btn btn-primary">Go back</router-link>
        </div>

        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Update Stock</h1>
                                    </div>
                                    <form class="user" @submit.prevent="stockUpdate" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <input type="text" v-model="form.product_quantity" class="form-control" id="exampleInputLastName" placeholder="Enter Product Name">
                                                    <small class="text-danger" v-if="errors.product_quantity">{{ errors.product_quantity[0] }}</small>
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
        axios.get('/api/product/'+id)
            .then( ({data}) => (this.form = data))
            .catch( error => {
                console.log(error);
            })
    },
    data(){
        return{
            form:{
                product_quantity: '',
            },
            errors : {},
        }
    },
    methods: {
        stockUpdate(){
            let id =  this.$route.params.id
            axios.post('/api/stock/update/'+id,this.form)
                .then( () => {
                    this.$router.push({ name: 'stock'});
                    Notification.success();
                })
                .catch(error => this.errors = error.response.data.errors);
        }
    }
}
</script>

<style scoped>

</style>
