<template>
    <div>
        <div class="row">
            <router-link to="/store-user" class="btn btn-primary">Add User</router-link>
        </div>

        <br>
        <input type="text" v-model="searchTerm" class="form-control"
               style="width: 300px;" placeholder="Search Here"/>
        <br>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">User</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Create Permission</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Role Assign To Permission</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
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
                                        <th>User Name</th>
                                        <th>Role Name</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="user in filtersearch" :key="user.id">
                                        <td> {{ user.name }}</td>
                                        <th> {{ user.rolename}}</th>
                                        <td>
                                            <router-link :to="{ name: 'edit-user', params: {id: user.id}}" class="btn btn-sm btn-primary"><font color="white">Edit</font></router-link>
                                            <a @click="deleteUser(user.id)" class="btn btn-sm btn-danger"><font color="white">Delete</font></a>
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
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <component :is="attachModelPermission"></component>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <component :is="attachRoleAssignToPermission"></component>
            </div>
        </div>

    </div>
</template>

<script type="text/javascript">
import createPermission from "../permission/permisison";
import roleAssignToPermission from "../permission/roleAssignToPermission";
export default {
    components: {
        roleAssignToPermission,createPermission
    },
    created() {
        if (!User.loggedIn()) {
            this.$router.push({ name: '/' })
        }
        this.allCategory();
    },
    computed:{
        attachRoleAssignToPermission(){
            return roleAssignToPermission;
        },
        attachModelPermission(){
            return createPermission;
        },
        filtersearch(){
            return this.users.filter(user => {
                return user.name.match(this.searchTerm);
            })
        }
    },
    data() {
        return {
            users: [],
            searchTerm: ''
        }
    },
    methods: {
        allCategory(){
            axios.get('/api/user/')
                .then( ({data}) => (this.users = data))
                .catch()
        },
        deleteUser(id){
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
                    axios.delete('/api/user/'+id)
                        .then( () => {
                            this.users = this.users.filter(user => {
                                return user.id != id ;
                            })
                        })
                        .catch( () => {
                            this.$router.push({ name: 'category' })
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

</style>
