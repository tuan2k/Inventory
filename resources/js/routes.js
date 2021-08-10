import register from "./components/auth/register";
import forget from "./components/auth/forget";
import home from  "./components/home";
import logout from "./components/auth/logout";
let login = require('./components/auth/login').default ;

// employee
import storeuser from './components/user/create'
import user from './components/user/index'
import edituser from './components/user/edit'

// employee
import storeemployee from './components/employee/create'
import employee from './components/employee/index'
import editemployee from './components/employee/edit'

// supplier
import storesupplier from './components/supplier/create'
import supplier from './components/supplier/index'
import editsupplier from './components/supplier/edit'

// category
import storecategory from './components/category/create'
import category from './components/category/index'
import editcategory from './components/category/edit'

// product
import storeproduct from './components/product/create'
import product from './components/product/index'
import editproduct from './components/product/edit'

// expense
import storeexpense from './components/expense/create'
import expense from './components/expense/index'
import editexpense from './components/expense/edit'

// salary
import storesalary from './components/salary/create'
import salary from './components/salary/all_employee'
import allsalary from './components/salary/index'
import viewsalary from './components/salary/view'
import editsalary from  './components/salary/edit'

// stock
import stock from "./components/product/stock";
import editstock from "./components/product/edit-stock";

// customer
import storecustomer from './components/customer/create'
import customer from './components/customer/index'
import editcustomer from './components/customer/edit'

// Pos
import pos from  './components/pos/pointofsale';

// Order
import order from "./components/order/order";
import view from "./components/order/view";
import searchorder from  "./components/order/search";

// role
import role from "./components/role/index"
import storerole from "./components/role/create"
import editrole from  "./components/role/edit"

export const routes = [
    { path: '/', component: login , name: '/' },
    { path: '/register', component: register, name : 'register' },
    { path: '/forget', component: forget, name : 'forget' },
    { path: '/home', component: home, name : 'home' },
    { path: '/logout', component: logout, name : 'logout' },
    // employee
    { path: '/store-employee', component: storeemployee, name : 'store-employee' },
    { path: '/employee', component: employee, name : 'employee' },
    { path: '/edit-employee/:id', component: editemployee, name : 'edit-employee' },
    // supplier
    { path: '/store-supplier', component: storesupplier, name : 'store-supplier' },
    { path: '/supplier', component: supplier, name : 'supplier' },
    { path: '/edit-supplier/:id', component: editsupplier, name : 'edit-supplier' },
    // category
    { path: '/store-category', component: storecategory, name : 'store-category' },
    { path: '/category', component: category, name : 'category' },
    { path: '/edit-category/:id', component: editcategory, name : 'edit-category' },
    // product
    { path: '/store-product', component: storeproduct, name : 'store-product' },
    { path: '/product', component: product, name : 'product' },
    { path: '/edit-product/:id', component: editproduct, name : 'edit-product' },
    // expense
    { path: '/store-expense', component: storeexpense, name : 'store-expense' },
    { path: '/expense', component: expense, name : 'expense' },
    { path: '/edit-expense/:id', component: editexpense, name : 'edit-expense' },
    // salary
    { path: '/give-salary', component: salary, name : 'give-salary' },
    { path: '/add-salary', component: storesalary, name : 'add-salary' },
    { path: '/salary', component: allsalary, name : 'salary' },
    { path: '/view-salary/:id', component: viewsalary, name : 'view-salary' },
    { path: '/edit-salary/:id', component: editsalary, name : 'edit-salary' },
    // stock
    { path: '/stock', component: stock, name : 'stock' },
    { path: '/edit-stock/:id', component: editstock, name : 'edit-stock' },
    // employee
    { path: '/store-customer', component: storecustomer, name : 'store-customer' },
    { path: '/customer', component: customer, name : 'customer' },
    { path: '/edit-customer/:id', component: editcustomer, name : 'edit-customer' },
    // pos
    { path: '/pos', component: pos, name : 'pos' },
    // order
    { path: '/order', component: order, name : 'order' },
    { path: '/view-order/:id', component: view , name : 'view-order' },
    { path: '/searchorder', component: searchorder , name : 'search-order' },
    // role
    { path: '/role', component: role, name : 'role' },
    { path: '/store-role', component: storerole , name : 'store-role' },
    { path: '/edit-role/:id', component: editrole , name : 'edit-role' },
    // user
    { path: '/store-user', component: storeuser, name : 'store-user' },
    { path: '/user', component: user, name : 'user' },
    { path: '/edit-user/:id', component: edituser, name : 'edit-user' },

]
