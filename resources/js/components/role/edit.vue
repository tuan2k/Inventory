<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <form class="user" @submit.prevent="roleUpdate">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Tên vai trò</label>
                            <input type="text" v-model="form.name" class="form-control" id="exampleInputLastName" placeholder="Enter Role Name">
                        </div>

                    </div>
                    <div class="col-md-12">
                        <div class="row"></div>

                        <div class="col-md-12">
                            <label>
                                <input type="checkbox" class="checkall">
                                checkall
                            </label>
                        </div>
                                                        <div class="card border-primary mb-4 col-md-12" v-for="table in tables">
                                                            <div class="card-header">
                                                                <label>
                                                                    <input type="checkbox" value="" class="checkbox_wrapper">
                                                                </label>
                                                                {{ table }}
                                                            </div>
                                                            <div class="row">
                                                                <div class="card-body text-primary" v-for="children in childrens">
                                                                    <h5 class="card-title">
                                                                        <label>
                                                                            <input type="checkbox" name="permission_id[]" >
                                                                        </label>
                                                                        <p>{{ children }}</p>
                                                                    </h5>
                                                                </div>

                                                            </div>
                                                        </div>

                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'

export default {
    name: "edit",
    created() {
        if (!User.loggedIn()) {
            this.$router.push({ name: '/' })
        }
        this.allTable();
        this.allChildren();
        this.allChecked();
        let id =  this.$route.params.id
        axios.get('/api/role/'+id)
            .then( ({data}) => (this.form = data))
            .catch( error => {
                console.log(error)
            })
    },
    data(){
        return{
            form: {
                name: '',
            },
            errors: {},
            tables : [],
            childrens: [],
            checked: [],
        }
    },
    methods: {
        allTable(){
            axios.get('/api/permission/')
                .then( ({data}) => (this.tables = data))
                .catch()
        },
        allChildren(){
            axios.get('/api/modulechildren/')
                .then( ({data}) => (this.childrens = data))
                .catch()
        },
        allChecked(){
            axios.get('/api/permission/check/')
                .then( ({data}) => (this.checked = data))
                .catch()
        },
        roleUpdate(){
            let id =  this.$route.params.id
            axios.patch('/api/role/'+id,this.form)
                .then( () => {
                    this.$router.push({ name: 'role'});
                    Notification.success();
                })
                .catch(error => this.errors = error.response.data.errors);
        },
    },
    mounted(){
        $('.checkbox_wrapper').on('click', function () {
            $(this).parents('.card').find('.checkbox_childrent').prop('checked', $(this).prop('checked'));
        });

        $('.checkall').on('click', function () {
            $(this).parents().find('.checkbox_childrent').prop('checked', $(this).prop('checked'));
            $(this).parents().find('.checkbox_wrapper').prop('checked', $(this).prop('checked'));

        });
    },
}
</script>

<style scoped>

</style>
