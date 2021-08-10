<template>
    <div>
        <div class="row">
            <router-link to="/expense" class="btn btn-primary">All Expense</router-link>
        </div>

        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Add Expense</h1>
                                    </div>
                                    <form class="user" @submit.prevent="expenseInsert" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <label for="exampleFormControlTextarea1">Expense detail</label>
                                                    <textarea class="form-control" v-model="form.details" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <input type="text" v-model="form.amount" class="form-control" id="exampleInputLastName" placeholder="Enter Amount">
                                                    <small class="text-danger" v-if="errors.amount">{{ errors.amount[0] }}</small>
                                                </div>

<!--                                                <div class="col-md-6">-->
<!--                                                    <input type="date" v-model="form.expense_date" class="form-control" id="exampleInputDate" placeholder="Enter Expense Date">-->
<!--                                                    <small class="text-danger" v-if="errors.expense_date">{{ errors.expense_date[0] }}</small>-->
<!--                                                </div>-->
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
                details : null,
                amount: null,
            },
            errors : {}
        }
    },
    methods: {
        expenseInsert(){
            axios.post('/api/expense',this.form)
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
                    this.form.photo = event.target.result
                    console.log(event.target.result)
                };
                reader.readAsDataURL(file);
            }
        }
    }
}
</script>

<style scoped>

</style>
