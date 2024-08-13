/* ----------
mobcode 

ver.2.0
---------- */


"use strict";

export const main = ($) => {
    const ORG = document.getElementById($.originId);
    const ADR = {
        from: location.pathname.split("/")[2] ?? "",//https://newflorrio.wiki.fc2.com[0]/[1]/[2]/
        to: $.options
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