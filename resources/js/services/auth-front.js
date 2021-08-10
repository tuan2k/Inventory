import Ls from './ls'
import axios from 'axios';

export default {
    async login(loginData) {
        try {
            let response = await axios.post('/api/auth/flogin', loginData);
            let annoucement = "";
            if (response.data.verify) {
                if (Ls.get('locale') === "vi") {
                    annoucement = 'Tài khoản của bạn chưa được xác minh!';
                } else {
                    annoucement = 'Your account has not been verified yet!';
                }
            } else if (undefined !== response.data.status && 0 == response.data.status) {
                if (Ls.get('locale') === "vi") {
                    annoucement = 'Tài khoản của bạn chưa được kích hoạt!';
                } else {
                    annoucement = 'Your account has not been activated!';
                }
            } else {
                if (Ls.get('locale') === "vi") {
                    annoucement = 'Đăng nhập thành công!';
                } else {
                    annoucement = 'Logged in successfully!';
                }
                annoucement = response.data.token;
                Ls.set('client.token', response.data.token);
                Ls.set('client.avatar', response.data.user.avatar);
                window.open(window.location.href, '_self');
            }
            return annoucement;
        } catch (error) {
            let annoucement = "";
            if (undefined !== error.response.status && error.response.status === 401) {
                if (Ls.get('locale') === "vi") {
                    annoucement = 'Địa chỉ email hoặc mật khẩu không đúng!';
                } else {
                    annoucement = 'The email address or password is incorrect!';
                }
            } else {
                if (Ls.get('locale') === "vi") {
                    annoucement = 'Đã xảy ra sự cố! Vui lòng thử lại!';
                } else {
                    annoucement = 'Something went wrong! Please try again!';
                }
            }
            return annoucement;
        }
    },

    async register(registerData) {
        try {
            let response = await axios.post('/api/auth/fregister', registerData, {
                headers: {
                    'locale': Ls.get('locale')
                }
            });
            let annoucement = "";
            if ('error' == response.data.message.status) {
                annoucement = response.data.message.description;
            } else {
                if (Ls.get('locale') === "vi") {
                    annoucement = 'Đăng ký thành công!';
                } else {
                    annoucement = 'Signup in successfully!';
                }
                annoucement = response.data.message.email;
            }
            return annoucement;
        } catch (error) {
            let annoucement = "";
            if (Ls.get('locale') === "vi") {
                annoucement = "Đã xảy ra sự cố! Vui lòng thử lại!";
            } else {
                annoucement = "Something went wrong! Please try again!"
            }
            return annoucement;
        }
    },

    async logout() {
        try {
            await axios.get('/api/auth/logout');
            Ls.remove('client.token');
            Ls.remove('client.avatar');
            if (Ls.get('locale') === "vi") {
                toastr['success']('Đăng xuất thành công!', 'Thông Điệp');
            } else {
                toastr['success']('Successfully logged out!', 'Message');
            }
        } catch (error) {
            console.log('Error', error.message);
        }
    },
}
