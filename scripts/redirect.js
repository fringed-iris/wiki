"use strict";

const redirect = (originId, data) => {
    const ORG = document.getElementById(originId);
    const C_URL = new URL(location.href);
    const ADR = {
        from: location.pathname.split("/")[2] ?? "",//https://newflorrio.wiki.fc2.com[0]/[1]/[2]/
        to: data
    }

    if (!C_URL.searchParams.get("rfrom") && ADR.from && ADR.to) {
        location.replace(`https://newflorrio.wiki.fc2.com/wiki/${ADR.to}?rfrom=${ADR.from}`);
    } else {
        const P = document.createElement("p");
        P.textContent = "リダイレクトに失敗しました。";
        ORG.after(P);

        console.error("リダイレクトに失敗しました。\n%o\n%o", ADR, ORG);
    }
}