"use strict";

export const main = (orgId, dir) => {
    const ORG = document.getElementById(orgId);
    const ADR = {
        from: location.pathname.split("/")[2] ?? "",//https://newflorrio.wiki.fc2.com[0]/[1]/[2]/
        to: dir
    }

    if (!sessionStorage.getItem("redirect") && ADR.from && ADR.to) {
        sessionStorage.setItem("redirect", ADR.from)

        location.replace(`https://newflorrio.wiki.fc2.com/wiki/${ADR.to}`);
    } else {
        sessionStorage.setItem("redirect", "");

        const P = document.createElement("p");
        P.textContent = `${ADR.from}から${ADR.to}へのリダイレクトに失敗しました。`;
        ORG.after(P);

        console.error("リダイレクトに失敗しました。\n%o\n%o", ADR, ORG);
    }
}