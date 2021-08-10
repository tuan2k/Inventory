<template>
    <div>

    </div>
</template>

<script>
import AppStorage from "../../helpers/AppStorage";

export default {
    created() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        Toast.fire({
            icon: 'success',
            title: 'Logout  successfully'
        })
        this.$router.push({name: '/'})
    }
}
</script>

<style scoped>

</style>
