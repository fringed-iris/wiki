export function main() {
    const ORDER = document.getElementsByClassName("getimg");
    if (ORDER.length == 0) return;
    for (let j = 0; j < ORDER.length; j++) {
        let string = ORDER[j].textContent;
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
        ORDER[j].textContent = "";
        ORDER[j].appendChild(image);
    }
}