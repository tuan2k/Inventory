<template>
    <div>
        <div class="row">
            <router-link to="/employee" class="btn btn-primary">Update Employee</router-link>
        </div>

        <div class="row justify-content-center">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Add Employee</h1>
                                    </div>
                                    <form class="user" @submit.prevent="employeeUpdate" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.name" class="form-control" id="exampleInputLastName" placeholder="Enter Full Name">
                                                    <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
                                                </div>

                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.email" class="form-control" id="" placeholder="Enter Your Email">
                                                    <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.address" class="form-control" id="exampleInputAddress" placeholder="Enter Your Address">
                                                    <small class="text-danger" v-if="errors.address">{{ errors.address[0] }}</small>
                                                </div>

                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.salary" class="form-control" id="exampleInputSalary" placeholder="Enter Your Salary">
                                                    <small class="text-danger" v-if="errors.salary">{{ errors.salary[0] }}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input type="date" v-model="form.joining_date" class="form-control" id="exampleInputJoiningDate" placeholder="Enter Your Joining Date">
                                                    <small class="text-danger" v-if="errors.joining_date">{{ errors.joining_date[0] }}</small>
                                                </div>

                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.nid" class="form-control" id="exampleInputNid" placeholder="Enter Your Nid">
                                                    <small class="text-danger" v-if="errors.nid">{{ errors.nid[0] }}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input type="text" v-model="form.phone" class="form-control" id="exampleInputPhone" placeholder="Enter Your Phone">
                                                    <small class="text-danger" v-if="errors.phone">{{ errors.phone[0] }}</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <input type="file" class="custom-file-input" id="customFile" @change="onFileSelected">
                                                    <label class="custom-file-label" for="customFile">Choose file</label>
                                                    <small class="text-danger" v-if="errors.photo">{{ errors.photo[0] }}</small>
                                                </div>

                                                <div class="col-md-6">
                                                    <img :src="form.new_photo" style="height: 40px;width: 40px"/>
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
        axios.get('/api/employee/'+id)
        .then( ({data}) => (this.form = data))
        .catch( console.log('error'))
    },
    data(){
        return{
            form:{
                name : '',
                email: '',
                phone: '',
                salary: '',
                address: '',
                photo: '',
                new_photo: '',
                nid: '',
                joining_date: ''
            },
            errors: {}
        }
    },
    methods: {
        employeeUpdate(){
            let id =  this.$route.params.id
            axios.patch('/api/employee/'+id,this.form)
                .then( () => {
                    this.$router.push({ name: 'employee'});
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
