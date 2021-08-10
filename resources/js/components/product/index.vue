<template>
    <div>
        <div class="row">
            <router-link to="/store-product" class="btn btn-primary">Add Product</router-link>
        </div>

        <br>
        <input type="text" v-model="searchTerm" class="form-control"
               style="width: 300px;" placeholder="Search Here"/>
        <br>
        <div class="row">
            <div class="col-lg-12 mb-4">
                <!-- Simple Tables -->
                <div class="card">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Simple Tables</h6>
                    </div>
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th>Product name</th>
                                <th>Photo</th>
                                <th>Selling Price</th>
                                <th>Category</th>
                                <th>Supplier</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="product in filtersearch" :key="product.id">
                                <td> {{ product.product_name }}</td>
                                <td> <img :src="product.image" id="pro_photo"/></td>
                                <td> {{ product.selling_price }}</td>
                                <td> {{ product.category_name }}</td>
                                <td> {{ product.name }}</td>
                                <td>
                                    <router-link :to="{ name: 'edit-product', params: {id: product.id}}" class="btn btn-sm btn-primary"><font color="white">Edit</font></router-link>
                                    <a @click="deleteProduct(product.id)" class="btn btn-sm btn-danger"><font color="white">Delete</font></a>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script type="text/javascript">
export default {
    name: "index",
    created() {
        if (!User.loggedIn()) {
            this.$router.push({ name: '/' })
        }
        this.allProduct();
    },
    computed:{
        filtersearch(){
            return this.products.filter(product => {
                return product.product_name.match(this.searchTerm);
            })
        }
    },
    data() {
        return {
            products: [],
            searchTerm: ''
        }
    },
    methods: {
        allProduct(){
            axios.get('/api/product/')
                .then( ({data}) => (this.products = data))
                .catch()
        },
        deleteProduct(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete('/api/product/'+id)
                        .then( () => {
                            this.products = this.products.filter(product => {
                                return product.id != id ;
                            })
                        })
                        .catch( () => {
                            this.$router.push({ name: 'product' })
                        })
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })

        }
    }

}
</script>

<style scoped>
#pro_photo{
    height: 40px;
    width: 40px;
}
</style>
