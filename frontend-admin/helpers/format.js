export const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export const formatRate = (rate) => {
    if (Number.isInteger(rate))
        return rate
    else
        return rate.toFixed(1)
}

export const formatDate = (created_at) => {
    const date = new Date(created_at);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // tháng (giá trị từ 0 đến 11, nên cộng thêm 1)
    const day = date.getDate(); // ngày trong tháng
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate
}

export const formatTime = (created_at) => {
    const date = new Date(created_at);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // tháng (giá trị từ 0 đến 11, nên cộng thêm 1)
    const day = date.getDate(); // ngày trong tháng
    const hours = date.getHours(); // giờ
    const minutes = date.getMinutes(); // phút
    const formattedDate = `${day}.${month}.${year}`;
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime + " " + formattedDate
}

export function formatAllInDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}
