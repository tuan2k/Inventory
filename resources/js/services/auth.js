import Ls from './ls'
import axios from 'axios';

export default {
    async login(loginData) {
        try {
            let response = await axios.post('/api/auth/login', loginData);
            if (response.data.verify) {
                if (Ls.get('locale') === "vi") {
                    window.toastr['error']('Tài khoản của bạn chưa được xác minh!', 'Lỗi');
                } else {
                    window.toastr['error']('Your account has not been verified yet!', 'Error');
                }
            } else if (0 == response.data.status) {
                if (Ls.get('locale') === "vi") {
                    window.toastr['error']('Tài khoản của bạn chưa được kích hoạt!', 'Lỗi');
                } else {
                    window.toastr['error']('Your account has not been activated!', 'Error');
                }
            } else if (response.data.type_of_user) {
                if (Ls.get('locale') === "vi") {
                    window.toastr['error']('Tài khoản của bạn không được phép vào hệ thống!', 'Lỗi');
                } else {
                    window.toastr['error']('Your account is not permitted to the system!', 'Error');
                }
            } else {
                Ls.set('auth.token', response.data.token);
                if (Ls.get('locale') === "vi") {
                    toastr['success']('Đăng nhập thành công!', 'Thông Điệp');
                } else {
                    toastr['success']('Logged in successfully!', 'Message');
                }
                return response.data.token
            }
        } catch (error) {
            if (error.response.status === 401) {
                if (Ls.get('locale') === "vi") {
                    window.toastr['error']('Địa chỉ email hoặc mật khẩu không đúng!', 'Lỗi');
                } else {
                    window.toastr['error']('The email address or password is incorrect!', 'Error');
                }
            } else {
                if (Ls.get('locale') === "vi") {
                    window.toastr['error']('Đã xảy ra sự cố! Vui lòng thử lại', 'Lỗi');
                } else {
                    window.toastr['error']('Something went wrong! Please try again', 'Error');
                }
            }
        }
    },

    async register(registerData) {
        try {
            let response = await axios.post('/api/auth/register', registerData, {
                headers: {
                    'locale': Ls.get('locale')
                }
            });
            if ('error' == response.data.message.status) {
                if (Ls.get('locale') === "vi") {
                    window.toastr['error'](response.data.message.description, 'Lỗi');
                } else {
                    window.toastr['error'](response.data.message.description, 'Error');
                }
                response =  null;
            } else {
                if (Ls.get('locale') === "vi") {
                    toastr['success']('Đăng ký thành công!', 'Thông Điệp');
                } else {
                    toastr['success']('Signup in successfully!', 'Message');
                }
                response = response.data.message.email;
            }
            return response;
        } catch (error) {
            if (Ls.get('locale') === "vi") {
                window.toastr['error']('Đã xảy ra sự cố! Vui lòng thử lại', 'Lỗi');
            } else {
                window.toastr['error']('Something went wrong! Please try again', 'Error');
            }
        }
    },

    async logout() {
        try {
            await axios.get('/api/auth/logout');

            Ls.remove('auth.token');
            if (Ls.get('locale') === "vi") {
                toastr['success']('Đăng xuất thành công!', 'Thông Điệp');
            } else {
                toastr['success']('Successfully logged out!', 'Message');
            }
        } catch (error) {
            console.log('Error', error.message);
        }
    },

    async check() {
        let response = await axios.get('/api/auth/check');
        window.Permissions = response.data.permissions;
        return !!response.data.authenticated;
    },
}
