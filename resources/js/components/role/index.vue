<template>
    <div>
        <div class="row">
            <router-link to="/store-role" class="btn btn-primary">Add Role</router-link>
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
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="role in filtersearch" :key="role.id">
                                <td> {{ role.name }}</td>
                                <td>
                                    <router-link :to="{ name: 'edit-role', params: {id: role.id}}" class="btn btn-sm btn-primary"><font color="white">Edit</font></router-link>
                                    <a @click="deleteRole(role.id)" class="btn btn-sm btn-danger"><font color="white">Delete</font></a>
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
        this.allRole();
    },
    computed:{
        filtersearch(){
            return this.roles.filter(role => {
                return role.name.match(this.searchTerm);
            })
        }
    },
    data() {
        return {
            roles: [],
            searchTerm: ''
        }
    },
    methods: {
        allRole(){
            axios.get('/api/role/')
                .then( ({data}) => (this.roles = data))
                .catch()
        },
        deleteRole(id){
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
                    axios.delete('/api/role/'+id)
                        .then( () => {
                            this.roles = this.roles.filter(role => {
                                return role.id != id ;
                            })
                        })
                        .catch( () => {
                            this.$router.push({ name: 'role' })
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
