<template>
    <div>

        <input type="text" v-model="searchTerm" class="form-control"
               style="width: 300px;" placeholder="Search Here"/>
        <br>
        <div class="row">
            <div class="col-lg-12 mb-4">
                <!-- Simple Tables -->
                <div class="card">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Today Order</h6>
                    </div>
                    <div class="table-responsive">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                            <tr>
                                <th>Customer Name</th>
                                <th>Total</th>
                                <th>Pay</th>
                                <th>Due</th>
                                <th>Pay By</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="order in filtersearch" :key="order.id">
                                <td> {{ order.name }}</td>
                                <td> {{ order.total }}</td>
                                <td> {{ order.pay }}</td>
                                <td> {{ order.due }}</td>
                                <td> {{ order.payby }}</td>
                                <td> {{ order.order_date }}</td>
                                <td>
                                    <router-link :to="{ name: 'view-order', params: {id: order.id}}" class="btn btn-sm btn-primary"><font color="white">View</font></router-link>
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
        this.allOrder();
    },
    computed:{
        filtersearch(){
            return this.orders.filter(order => {
                return order.name.match(this.searchTerm);
            })
        }
    },
    data() {
        return {
            orders: [],
            searchTerm: ''
        }
    },
    methods: {
        allOrder(){
            axios.get('/api/orders/')
                .then( ({data}) => (this.orders = data))
                .catch()
        }
    }

}
</script>

<style scoped>

</style>
