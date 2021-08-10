
require('./bootstrap');
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueInternationalization from 'vue-i18n';
import Locale from './vue-i18n-locales.generated';
import vMultiselectListbox from 'vue-multiselect-listbox'

Vue.component('v-multiselect-listbox', vMultiselectListbox)
Vue.use(VueRouter)
Vue.use(VueInternationalization);

const lang = document.documentElement.lang.substr(0, 2);
// or however you determine your current app locale

const i18n = new VueInternationalization({
    locale: lang,
    messages: Locale
});

// Routes Imported
import {routes} from './routes'

import DataTable from 'laravel-vue-datatable';

Vue.use(DataTable);


const router = new VueRouter({
    routes,
    mode : 'history'
})

// import user class
import User from './helpers/User'
window.User = User
import Notification from './helpers/Notification'
window.Notification = Notification

// import Alert start
import Swal from "sweetalert2";
window.Swal = Swal ;

// import jquery
import jQuery from 'jquery'
window.jQuery = jQuery

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
window.Toast = Toast;

window.Reload = new Vue();

const app = new Vue({
    el: '#app',
    i18n,
    router
});
