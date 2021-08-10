<template>
    <div>
        <div class="container-fluid" id="container-wrapper">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">POS Dashboard</h1>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="./">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">POS</li>
                </ol>
            </div>

            <div class="row mb-3">
                <!-- Area Chart -->
                <div class="col-xl- 5 col-lg-5">
                    <div class="card mb-4">
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Expense Insert</h6>
                            <a href="" class="btn btn-sm btn-info">Add Customer</a>
                        </div>
                        <div class="card-body">
                            <div class="chart-area">
                                        <div class="table-responsive" style="font-size: 11px;">
                                            <table class="table align-items-center table-flush">
                                                <thead class="thead-light">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Qty</th>
                                                    <th>Unit</th>
                                                    <th>Total</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="cart in carts" :key="cart.id">
                                                    <td><a href="#">{{ cart.pro_name }}</a></td>
                                                    <td><input type="text" :value="cart.pro_quantity" readonly="" style="width: 20px;"/>
                                                    <button @click.prevent="increment(cart.id)" class="btn btn-sm btn-success">+</button>
                                                    <button v-if="cart.pro_quantity >= 2" @click.prevent="decrement(cart.id)" class="btn btn-sm btn-danger">-</button>
                                                    <button v-else="" disabled="disabled" @click.prevent="decrement(cart.id)" class="btn btn-sm btn-danger">-</button>
                                                    </td>
                                                    <td>{{cart.pro_price}}</td>
                                                    <td>{{cart.sub_total}}</td>
                                                    <td><a @click="removeItem(cart.id)" class="btn btn-sm btn-primary">X</a></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="card-footer">
                                            <ul class="list-group">
                                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                                    Total Quantity:
                                                    <strong>{{ this.qty }}</strong>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                                    Sub total:
                                                    <strong>{{ this.subtotal }} $</strong>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                                    Vat:
                                                    <strong>{{ vats.vat }} %</strong>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                                    Total Amount:
                                                    <strong> {{ subtotal*vats.vat/100 + subtotal}} $</strong>
                                                </li>
                                            </ul>
                                            <br>
                                            <form @submit.prevent="orderdone">
                                                <label>Customer Name</label>
                                                <select class="form-control" v-model="customer_id">
                                                    <option :value="customer.id" v-for="customer in customers">{{customer.name}}</option>
                                                </select>

                                                <label>Pay</label>
                                                <input type="text" class="form-control" required v-model="pay"/>

                                                <label>Due</label>
                                                <input type="text" class="form-control" required v-model="due"/>

                                                <label>Pay By</label>
                                                <select class="form-control" v-model="payby">
                                                    <option value="HandCash">Hand Cash</option>
                                                    <option value="Cheaque">Cheaque</option>
                                                    <option value="GiftCard">Gift Card</option>
                                                </select>

                                                <br>
                                                <button type="submit" class="btn btn-success">Submit</button>
                                            </form>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Pie Chart -->
                <div class="col-xl-7 col-lg-7">
                    <div class="card mb-4">
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Products Sold</h6>
                        </div>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">All Product</a>
                            </li>
                            <li class="nav-item" v-for="category in categories" :key="category.id">
                                <a @click="subProduct(category.id)" class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">{{ category.category_name }}</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="card-body">
                                    <input type="text" v-model="searchTerm" class="form-control"
                                           style="width: 560px;" placeholder="Search Here"/>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-sm-6 col-6" v-for="product in filtersearch" :key="product.id">
                                            <div class="row">
                                                <button class="btn btn-sm" @click.prevent="AddToCart(product.id)">
                                                    <div class="card" style="width: 8.5rem; margin-bottom:5px; ">
                                                        <img class="card-img-top" :src="product.image" id="pro_photo" alt="Card image cap">
                                                        <div class="card-body">
                                                            <h6 class="card-title">{{ product.product_name}}</h6>
                                                            <span v-if="product.product_quantity >=1" class="badge badge-success">Available
                                             {{ product.product_quantity }}</span>
                                                            <span v-else="" class="badge badge-danger">Stock out</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="card-body">
                                <input type="text" v-model="getsearchTerm" class="form-control"
                                       style="width: 560px;" placeholder="Search Here"/>
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-6 col-6" v-for="getproduct in getfiltersearch" :key="getproduct.id">
                                        <div class="row">
                                            <button  class="btn btn-sm" @click.prevent="AddToCart(getproduct.id)">>
                                                <div class="card" style="width: 8.5rem; margin-bottom:5px; ">
                                                    <img class="card-img-top" :src="getproduct.image" id="product_photo" alt="Card image cap">
                                                    <div class="card-body">
                                                        <h6 class="card-title">{{ getproduct.product_name}}</h6>
                                                        <span v-if="getproduct.product_quantity >=1" class="badge badge-success">Available
                                             {{ getproduct.product_quantity }}</span>
                                                        <span v-else="" class="badge badge-danger">Stock out</span>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            <!--Row-->
        </div>
        </div>
        <!---Container Fluid-->
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
        this.allCategory();
        this.allCustomer();
        this.cartProduct();
        this.getVat();
        Reload.$on('AfterAdd',() => {
            this.cartProduct();
        })
    },
    computed:{
        filtersearch(){
            return this.products.filter(product => {
                return product.product_name.match(this.searchTerm);
            })
        },
        getfiltersearch(){
            return this.getproducts.filter(getproduct => {
                return getproduct.product_name.match(this.getsearchTerm);
            })
        },
        qty(){
            let sum = 0;
            for (let i=0; i < this.carts.length; i++){
                sum +=  ( parseFloat(this.carts[i].pro_quantity));
            }
            return sum;
        },
        subtotal(){
            let sum = 0;
            for (let i=0; i < this.carts.length; i++){
                sum +=  ( parseFloat(this.carts[i].pro_quantity) * parseFloat(this.carts[i].pro_price));
            }
            return sum;
        }
    },
    data() {
        return {
            products: [],
            categories: [],
            getproducts: [],
            customers: [],
            carts: [],
            vats: '',
            searchTerm: '',
            getsearchTerm: '',
            customer_id: '',
            pay: '',
            due: '',
            payby: '',
        }
    },
    methods: {
        allProduct(){
            axios.get('/api/product/')
                .then( ({data}) => (this.products = data))
                .catch()
        },
        allCategory(){
            axios.get('/api/category/')
                .then( ({data}) => (this.categories = data))
                .catch()
        },
        subProduct(id){
            axios.get('/api/getting/product/'+id)
                .then( ({data}) => (this.getproducts = data))
                .catch()
        },
        allCustomer(){
            axios.get('/api/customer/')
            .then( ({data}) => (this.customers = data))
            .catch()
        },
        // Cart Method
        AddToCart(id){
            axios.get('/api/addToCart/'+id)
                .then( () => {
                    Notification.cart_success();
                    Reload.$emit('AfterAdd');
                })
                .catch()
        },
        cartProduct(){
            axios.get('/api/cart/product/')
                .then( ({data}) => (this.carts = data))
                .catch()
        },
        // Remove Item
        removeItem(id){
            axios.delete('/api/remove/cart/'+id)
                .then( () => {
                    Reload.$emit('AfterAdd');
                    Notification.cart_delete();
                })
                .catch()
        },
        increment(id){
            axios.get('/api/increment/'+id)
                .then( () => {
                    Notification.cart_success();
                    Reload.$emit('AfterAdd');
                })
                .catch()
        },
        decrement(id){
            axios.get('/api/decrement/'+id)
                .then( () => {
                    Notification.cart_success();
                    Reload.$emit('AfterAdd');
                })
                .catch()
        },
        getVat(){
            axios.get('/api/vats/')
                .then( ({data}) => (this.vats = data))
                .catch()
        },
        orderdone(){
            let total = this.subtotal * this.vats.vat/100 + this.subtotal ;
            var data = { qty: this.qty, subtotal: this.subtotal, customer_id: this.customer_id,
                pay: this.pay , due: this.due , payby: this.payby, vat: this.vats.vat, total: total }
            axios.post('/api/orderdone/', data)
                .then( () => {
                    Notification.success();
                    this.$router.push({ name : 'home' })
                })
                .catch(error => this.errors = error.response.data.errors);
        },

    }

}
</script>

<style scoped>
#pro_photo{
    height: 100px;
    width: 135px;
}
</style>
