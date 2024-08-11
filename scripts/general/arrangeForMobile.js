/*
・スマホ判別
・全体の表示サイズ調整
・メニュー調整
・それぞれのタグについて処理
    ・table,td,th,h2,button,inputのフォントサイズマシマシ
    ・table調整
・コメント欄のサイズ調整
・region修正 (2024/7/4)
*/
export function main() {
    {//メニュー表示ボタン（スマホのif文の中に入れないこと。CSSで条件指定済み。）
        const wrap = document.getElementById("wrap");

        const menuButton = document.createElement("div");
        menuButton.id = "menubutton";
        menuButton.textContent = "MENU";
        menuButton.setAttribute("data-cond", "open");
        menuButton.onclick = () => {
            const menuButton = document.getElementById("menubutton")
            const menu = document.getElementById("menu");

            switch (menuButton.getAttribute("data-cond")) {
                case "open":
                    menuButton.setAttribute("data-cond", "close");
                    menu.setAttribute("data-cond", "open");
                    break;
                case "close":
                    menuButton.setAttribute("data-cond", "open");
                    menu.setAttribute("data-cond", "close");
                    break;

                default:
                    menuButton.setAttribute("data-cond", "open");
                    menu.setAttribute("data-cond", "close");
                    break;
            }
        };
        window.onresize = () => {
            const menu = document.getElementById("menu");

            if (window.innerWidth > 1250) {
                menuButton.setAttribute("data-cond", "open");
                menu.setAttribute("data-cond", "")
            };
        }
        const img = document.createElement("img");//閉じるボタン
        img.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggaWQ9ImEiIGQ9Im0xLjE4IDEuMTggNy42NCA3LjY0IiBzdHlsZT0ic3Ryb2tlOiNmZmY7c3Ryb2tlLXdpZHRoOjIuMzY7c3Ryb2tlLWxpbmVjYXA6cm91bmQiLz48dXNlIGhyZWY9IiNhIiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA1IDUpIi8+PC9zdmc+";

        menuButton.appendChild(img);
        wrap.appendChild(menuButton);
    }
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {//スマホなら
        (() => { //全体の表示サイズ調整
            const adjText = '<div style="color:transparent;">おっと、この秘密のメッセージを君は見つけたようだね！とは言っても、これはスマホ版表示の調整のために生成されているものだから、見つけても特にいいことはないけれど。</div>';
            let userbodyElement = document.getElementsByClassName("user_body")[0];
            if (userbodyElement) userbodyElement.innerHTML += adjText;
        })();

        /*CSSメディアクエリにて対応
        const menuElement = document.getElementById("menu");
        menuElement.id = "menu-mobile"; //CSSを置き換え、メニューを下に降ろす
        document.getElementById("main").style.marginLeft = "0"; //画面幅に合わせる
        */


        function pushTagToArray(tag) { //タグを集めて配列に入れる
            let list = document.getElementsByTagName(tag);
            let array = [];
            for (let i = 0; i < list.length; i++) { array.push(list[i]); }
            return array;
        }
        const tableList = pushTagToArray("table");
        const tdList = pushTagToArray("td");
        const thList = pushTagToArray("th");

        /*フォントサイズはちょっと考え中です。fc2の仕組みが不明です。Shaga*/

        tableList.forEach(e => {
            e.style.width = "auto";
            e.parentNode.innerHTML = '<div style="display: block; overflow-x:scroll;">' + e.parentNode.innerHTML + '</div>'
        }); //スクロール可能なdivで包む
        [tdList, thList].forEach(list => { //テーブルの幅を拡大
            list.forEach(e => {
                const value = parseInt(e.style.width);
                const unit = e.style.width.substr((value + "").length);
                if (unit.match(/.*px.*/)) e.style.width = value * 2 + unit;
            })
        })

        //コメント欄の表示ブレを修正（返信されたコメントはスマホだと表示が小さくなる。なぜかspanに包むと元に戻る）
        function adjustCommentSize(com) {
            for (let li of com.children) { //urの中のliそれぞれについて
                let defaultText = li.innerHTML;
                if (defaultText.match(/.*ul.*/)) { //ulタグが含まれている=>表示がおかしくなっているなら
                    li.innerHTML = "<span>" + defaultText + "</span>"; //spanで囲む
                    for (let com2 of li.firstChild.children) {
                        if (com2.tagName == "UL") {
                            adjustCommentSize(com2); //内部のulもそれぞれ調整
                        }
                    }
                }
            }
        }

        let comments = document.getElementsByClassName("user_comment_list"); //コメント欄を取得
        for (let com of comments) {
            adjustCommentSize(com); //それぞれのコメント欄のulタグについて調整
        }

        {
            let regionButtonArr = [];
            let rb1 = document.getElementsByClassName("area_open");
            let rb2 = document.getElementsByClassName("area_close");
            for (let i = 0; i < rb1.length; i++) {
                regionButtonArr.push(rb1[i]);
            }
            for (let i = 0; i < rb2.length; i++) {
                regionButtonArr.push(rb2[i]);
            }
            for (let i = 0; i < regionButtonArr.length; i++) {
                let regionButton = regionButtonArr[i];
                let regionDiv = regionButton.nextElementSibling;
                regionButton.addEventListener("click", () => {
                    if (regionDiv.style.display == "none") {
                        regionDiv.style.display = "block";
                        regionButton.className = "area_open";
                    }
                    else {
                        regionDiv.style.display = "none";
                        regionButton.className = "area_close";
                    }
                })
            }
        }
    }
}