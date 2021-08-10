<template>
    <div>
        <div class="row">
            <router-link to="/salary" class="btn btn-primary">All Salary</router-link>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Update Salary</h1>
                                    </div>
                                    <form class="user" @submit.prevent="salaryUpdate" >
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input readonly="readonly" type="text" v-model="form.name" class="form-control" id="exampleInputLastName" placeholder="Enter Name">
                                                    <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
                                                </div>

                                                <div class="col-md-6">
                                                    <input readonly="readonly" type="text" v-model="form.email" class="form-control" id="" placeholder="Enter Email">
                                                    <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <label for="exampleFormControlSelect1">Month</label>
                                                    <select class="form-control" id="exampleFormControlSelect1" v-model="form.salary_month">
                                                        <option value="January">January</option>
                                                        <option value="February">February</option>
                                                        <option value="March">March</option>
                                                        <option value="April">April</option>
                                                        <option value="May">May</option>
                                                        <option value="June">June</option>
                                                        <option value="July">July</option>
                                                        <option value="August">August</option>
                                                        <option value="September">September</option>
                                                        <option value="October">October</option>
                                                        <option value="November">November</option>
                                                        <option value="December">December</option>
                                                    </select>
                                                    <small class="text-danger" v-if="errors.salary_month">{{ errors.salary_month[0] }}</small>
                                                </div>
                                                <input type="hidden" v-model="form.employee_id">
                                                <div class="col-md-6">
                                                    <label>Salary</label>
                                                    <input type="text" v-model="form.amount" class="form-control" id="exampleInputProductQuantity" placeholder="Enter Amount">
                                                    <small class="text-danger" v-if="errors.amount">{{ errors.amount[0] }}</small>
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
        let id =  this.$route.params.id
        axios.get('/api/edit/salary/'+id)
            .then( ({data}) => (this.form = data))
            .catch( console.log('error'))
    },
    data(){
        return {
            form: {
                name: '',
                email: '',
                salary_month: '',
                amount: '',
                employee_id: '',
            },
            errors: {}
        }
    },
    methods: {
        salaryUpdate(){
            let id =  this.$route.params.id
            axios.post('/api/salary/update/'+id,this.form)
                .then( () => {
                    this.$router.push({ name: 'salary'});
                    Notification.success();
                })
                .catch(error => this.errors = error.response.data.errors);
        }
    }
}
</script>

<style scoped>

</style>
