import { useSelector, useDispatch } from 'react-redux'
import { customerLogOut } from '@/store/actions/customerActions'
import { swalert, swtoast } from '@/mixins/swal.mixin'
import { dispatch } from '@/store/store'

export const sidebar = [
    {
        text: "Thông tin cá nhân",
        href: "/account/infor",
        onClick: () => { }
    },
    {
        text: "Danh sách đơn hàng",
        href: "/account/orders",
        onClick: () => { }
    },
    {
        text: "Đăng xuất",
        href: "#",
        onClick: () => {
            swalert
                .fire({
                    title: "Đăng xuất",
                    icon: "warning",
                    text: "Bạn muốn đăng xuất?",
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        dispatch(customerLogOut())
                        window.location.assign('/')
                    }
                })
        }
    },
]