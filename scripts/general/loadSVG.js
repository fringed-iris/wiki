export function main() {
    orders = document.getElementsByClassName("getimg");
    if (orders.length == 0) return;
    for (let j = 0; j < orders.length; j++) {
        let string = orders[j].textContent;
        let number = 0;
        let link;
        for (let i = 0; i < string.length; i++) {
            if (string.substr(i, 1) == ":") {
                link = "https://" + string.substr(i + 1);
                break;
            }
            number *= 10;
            number += Number(string.substr(i, 1));
        }
        let image = document.createElement("img");
        image.src = link;
        image.width = number;
        orders[j].textContent = "";
        orders[j].appendChild(image);
    }
}