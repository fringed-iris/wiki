/* ----------
mobcode 

ver.1.6
---------- */

const RARITY_LEN = Object.keys(window.florr.rarity.id).length;

const calcAbility = function (baseAbility, type) {
    const TABLE = {}

    for (let id = 0; id <= (RARITY_LEN / 2 - 1); id++) {
        let factor;

        if (type === "health") {
            factor = window.florr.database.mobHealthFactor[id];
        } else {
            factor = (3 ** id);
        }

        const AMOUNT = (baseAbility * factor);
        TABLE[id] = AMOUNT;
    }

    return TABLE;
}
export const main = function ($) {
    const TABLE = document.createElement("table");
    {
        const DIV = document.getElementById($.originId).parentNode;
        DIV.parentNode.insertBefore(TABLE, DIV);

        let text = document.createElement("p");
        text.innerText = "このステータスは自動生成されています。";

        DIV.parentNode.insertBefore(text, DIV.nextSibling);
    }

    const TBODY = TABLE.createTBody();

    for (let rarityID = -1; rarityID < RARITY_LEN / 2; rarityID++) {
        if (
            (rarityID !== -1 && rarityID < $.options.leastRarity)
            || $.options.maxRarity < rarityID
        ) continue;

        const TR = TBODY.insertRow();

        const RARITY_OPTS = {};
        if (-1 < rarityID) {
            RARITY_OPTS.health = calcAbility($.options.baseHealth, "health")[rarityID];
            RARITY_OPTS.damage = calcAbility($.options.baseDamage)[rarityID];
            if ($.options.baseMaxHealth) RARITY_OPTS.maxHealth = calcAbility($.options.baseMaxHealth, "health")[rarityID];
            RARITY_OPTS.special = $.options.specialStatus.map(e => {
                if (e.type == "health") return calcAbility(e.base, "health")[rarityID];
                return calcAbility(e.base)[rarityID];
            });
            RARITY_OPTS.armor =
                calcAbility(window.florr.database.defaultArmor)[Math.min(rarityID, 6)]
                + ($.options.baseArmor ? calcAbility($.options.baseArmor)[rarityID] : 0);
        }

        {//レアリティのセル
            if (rarityID === -1) {
                const TH = document.createElement("th");
                TH.innerText = "レアリティ";

                TR.appendChild(TH);
            } else {
                const TD = TR.insertCell();
                TD.style.textAlign = "center";
                TD.style.backgroundColor = window.florr.rarity.color.background[window.florr.rarity.id[rarityID]];
                TD.style.color = window.florr.rarity.color.text[window.florr.rarity.id[rarityID]];
                TD.innerText = window.florr.rarity.name[window.florr.rarity.id[rarityID]];
            }
        }
        {//攻撃力のセル
            if (rarityID === -1) {
                const TH = document.createElement("th");
                TH.innerText = "攻撃力";
                TH.style.width = "85px";

                TR.appendChild(TH);
            } else {
                const TD = TR.insertCell();
                TD.style.textAlign = "center";
                TD.innerText = String(RARITY_OPTS.damage);
            }
        }
        {//体力のセル
            if (rarityID === -1) {
                const TH = document.createElement("th");
                TH.innerText = "体力";
                TH.style.width = $.options.baseMaxHealth
                    ? "170px"
                    : "85px";

                TR.appendChild(TH);
            } else {
                const TD = TR.insertCell();
                TD.style.textAlign = "center";
                TD.innerText = String(RARITY_OPTS.health);
                if ($.options.baseMaxHealth) TD.innerText += `~${String(RARITY_OPTS.maxHealth)}`;
            }
        }
        {//アーマーのセル
            if (rarityID === -1) {
                const TH = document.createElement("th");
                TH.innerText = "アーマー";
                TH.style.width = "85px";

                TR.appendChild(TH);
            } else {
                const TD = TR.insertCell();
                TD.style.textAlign = "center";
                TD.innerText = String(Math.round(RARITY_OPTS.armor));
            }
        }
        for (let i = 0; i < $.options.specialStatus.length; i++) {//その他カスタムプロパティ
            const STATUS = $.options.specialStatus[i];
            STATUS.last

            if (rarityID === -1) {
                const TH = document.createElement("th");
                TH.innerText = STATUS.name;
                TH.style.width = STATUS.width
                    ? `${STATUS.width}px`
                    : "85px";

                TR.appendChild(TH);
            } else {
                const TD = TR.insertCell();

                switch (STATUS.type) {
                    case "normal":
                        TD.innerText = RARITY_OPTS.special[i] + "" + STATUS.last;
                        break;
                    case "health":
                        TD.innerText = RARITY_OPTS.special[i] + "" + STATUS.last;
                        break;
                    case "constant":
                        TD.innerText = STATUS.base + STATUS.increase * rarityID + "" + STATUS.last;
                        break;
                    case "unique":
                        TD.innerText = STATUS.uniqueDatas[rarityID];
                        break;

                    default: break;
                }
            }
        }
    }
}