import Swal from "sweetalert2";

const swToastInstance = Swal.mixin({
    position: "top",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    toast: true,
});

export const swalert = Swal.mixin({
    confirmButtonText: "<i class='fas fa-check'></i> Chấp nhận",
    cancelButtonText: "<i class='fas fa-xmark'></i> Hủy bỏ",
});

// export const question = Swal.fire({
//     title: 'Chọn loại tài khoản',
//     icon: 'question',
//     iconHtml: '?',
//     confirmButtonText: 'نعم',
//     cancelButtonText: 'لا',
//     showCancelButton: true,
//     showCloseButton: true
// })

export const swtoast = {
    fire(config) {
        swToastInstance.fire({
            ...config,
            toast: true,
        });
    },

    success(config) {
        swToastInstance.fire({
            icon: "success",
            ...config,
            toast: true,
        });
    },

    error(config) {
        swToastInstance.fire({
            icon: "error",
            color: "#f00",
            ...config,
            toast: true,
        });
    },
};