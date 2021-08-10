<template>
    <div class="content-wrapper">
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <form @submit.prevent="permissionInsert">
                            <div class="form-group">
                                <label>Chon tên module</label>
                                <select class="form-control" v-model="form.type_name">
                                    <option v-for="moduleItem in tables" :value="moduleItem">{{ moduleItem }}</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <div class="row">

                                    <div class="col-md-3" v-for="moduleItemChilrent in childrens">
                                        <label>
                                            <input type="checkbox" :value="moduleItemChilrent" v-model="form.module_children">
                                            {{ moduleItemChilrent }}
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "index",
    created() {
        if (!User.loggedIn()) {
            this.$router.push({ name: '/' })
        }
        this.allTable();
        this.allChildren();
    },
    data() {
        return {
            form:{
                type_name : null,
                module_children: [],
            },
            childrens: [],
            tables: [],
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
        permissionInsert(){
            axios.post('/api/permission/',this.form)
                .then( () => {
                    this.$router.push({ name: 'home'});
                    Notification.success();
                })
                .catch(error => this.errors = error.response.data.errors);
        }
    }
}
</script>

<style>

</style>
