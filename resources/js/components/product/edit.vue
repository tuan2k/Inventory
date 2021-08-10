<template>
    <div>
        <div class="row">
            <router-link to="/product" class="btn btn-primary">All Product</router-link>
        </div>

        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Add Product</h1>
                                    </div>
                                    <form class="user" @submit.prevent="productUpdate" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.product_name" class="form-control" id="exampleInputLastName" placeholder="Enter Product Name">
                                                    <small class="text-danger" v-if="errors.product_name">{{ errors.product_name[0] }}</small>
                                                </div>

                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.product_code" class="form-control" id="" placeholder="Enter Product Code">
                                                    <small class="text-danger" v-if="errors.product_code">{{ errors.product_code[0] }}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.buying_price" class="form-control" id="exampleInputAddress" placeholder="Enter Buying Price">
                                                    <small class="text-danger" v-if="errors.buying_price">{{ errors.buying_price[0] }}</small>
                                                </div>

                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.selling_price" class="form-control" id="exampleInputSalary" placeholder="Enter Selling Price">
                                                    <small class="text-danger" v-if="errors.selling_price">{{ errors.selling_price[0] }}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input type="date" v-model="form.buying_date" class="form-control" id="exampleInputJoiningDate" placeholder="Enter Your Buying Date">
                                                    <small class="text-danger" v-if="errors.buying_date">{{ errors.buying_date[0] }}</small>
                                                </div>

                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.root" class="form-control" id="exampleInputNid" placeholder="Enter Root">
                                                    <small class="text-danger" v-if="errors.root">{{ errors.root[0] }}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-4">
                                                    <label for="exampleFormControlSelect1">Category ID</label>
                                                    <select class="form-control" id="exampleFormControlSelect1" v-model="form.category_id">
                                                        <option v-for="category in categories" :value="category.id">{{ category.category_name }}</option>
                                                    </select>
                                                    <small class="text-danger" v-if="errors.category_id">{{ errors.category_id[0] }}</small>
                                                </div>
                                                <div class="col-md-4">
                                                    <label for="exampleFormControlSelect2">Supplier ID</label>
                                                    <select class="form-control" id="exampleFormControlSelect2" v-model="form.supplier_id">
                                                        <option v-for="supplier in suppliers" :value="supplier.id">{{ supplier.name }}</option>
                                                    </select>
                                                    <small class="text-danger" v-if="errors.supplier_id">{{ errors.supplier_id[0] }}</small>
                                                </div>
                                                <div class="col-md-4">
                                                    <label>Product Quantity</label>
                                                    <input type="text" v-model="form.product_quantity" class="form-control" id="exampleInputProductQuantity" placeholder="Enter Your Quantity">
                                                    <small class="text-danger" v-if="errors.product_quantity">{{ errors.product_quantity[0] }}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input type="file" class="custom-file-input" id="customFile" @change="onFileSelected">
                                                    <label class="custom-file-label" for="customFile">Choose file</label>
                                                    <small class="text-danger" v-if="errors.image">{{ errors.image[0] }}</small>
                                                </div>

                                                <div class="col-md-6">
                                                    <img :src="form.new_image" style="height: 40px;width: 40px"/>
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
        axios.get('/api/category/')
            .then( ({data}) => (this.categories = data) )

        axios.get('/api/supplier/')
            .then( ({data}) => (this.suppliers = data) )
    },
    data(){
        return{
            form:{
                product_name : '',
                product_code: '',
                category_id: '',
                supplier_id: '',
                root: '',
                buying_price: '',
                selling_price: '',
                buying_date: '',
                product_quantity: '',
                image: '',
                new_image: ''
            },
            errors : {},
            suppliers: {},
            categories: {},
        }
    },
    methods: {
        productUpdate(){
            let id =  this.$route.params.id
            axios.patch('/api/product/'+id,this.form)
                .then( () => {
                    this.$router.push({ name: 'product'});
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
                    this.form.new_image = event.target.result
                };
                reader.readAsDataURL(file);
            }
        }
    }
}
</script>

<style scoped>

</style>
