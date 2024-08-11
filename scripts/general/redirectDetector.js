export function main() {
    const ADR = sessionStorage.getItem("redirect");

    if (ADR) {
        sessionStorage.setItem("redirect", "");

        const WRAP = document.getElementById("wrap");

        const ANM = {
            interval: 500,
            popup: 200,
            bg: 8000
        }
        const DIV = document.createElement("div");
        DIV.id = "redirect";
        DIV.style.display = "block";
        DIV.style.transition = `
    transform ${ANM.popup / 1000}s ease-out,
    opacity ${ANM.popup / 1000}s ease-out,
    background-position ${ANM.bg / 1000}s linear`;
        {
            const P = document.createElement("p");
            P.textContent = `「${ADR}」から転送されました。`;
            const A = document.createElement("a");
            A.textContent = "リダイレクトページの編集はこちら";
            A.href = `https://newflorrio.wiki.fc2.com/edit/${ADR}/`;

            DIV.appendChild(P);
            DIV.appendChild(A);
        }
        WRAP.appendChild(DIV);

        setTimeout(() => DIV.setAttribute("name", "open"), ANM.interval);
        setTimeout(() => DIV.setAttribute("name", "close"), ANM.interval + ANM.popup + ANM.bg);
        setTimeout(() => DIV.style.display = "none", ANM.interval + ANM.popup * 2 + ANM.bg);
    }
}