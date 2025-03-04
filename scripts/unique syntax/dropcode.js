"use strict";

import { createStatusTable } from "../util/statustable.js";

/** 好きなページの好きなidの要素を返す（Promise）*/
async function getElementFromPageAndId(page, id) {
    const url = "https://" + location.host + "/wiki/" + page;
    try {
        const response = await fetch(url);
        if (!response.ok) throw `要素の取得に失敗しました id "${id}" in page "${page}"`;
        const text = await response.text();
        const wholeDOM = new DOMParser().parseFromString(text, "text/html");
        const element = wholeDOM.getElementById(id);
        return element;
    } catch (err) {
        throw err;
    }
}

/** 既定値を使ってドロップ率データをゲットする（Promise）*/
function loadDropTableData() {
    const pageName = "dropcode_json", id = "data";
    return getElementFromPageAndId(pageName, id)
        .then(element => {
            const brList = element.getElementsByTagName("br");
            for (let i = 0; i < brList.length; i++) element.removeChild(brList[i]);
            const text = element.textContent;

            //安全性チェック アルファベットまたはハイフンまたはアンダーバーを含む場合拒否
            if (text.match(/[A-Za-z_\-]/)) throw `${pageName}に予期しないデータが入力されています`;

            const object = JSON.parse("{" + text + "}");
            return object;
        });
}

const testDropTableData = {
    "1": [
        [0.4675785092462756, 0.5324214907537244, 0, 0, 0, 0, 0, 0, 0],
        [0.047798929241334, 0.952201070758666, 0, 0, 0, 0, 0, 0, 0],
        [6.225606681461188e-14, 0.4850421998688756, 0.5149578001310622, 0, 0, 0, 0, 0, 0],
        [8.17947055452274e-199, 0.000019350530422253733, 0.5910876937737627, 0.4088929556958151, 0, 0, 0, 0, 0],
        [0, 5.418230560002967e-95, 0.000027122061633222186, 0.8131792969482176, 0.1867935809901492, 0, 0, 0, 0],
        [0, 0, 4.635909261834503e-229, 0.00003236233902589367, 0.969418399018874, 0.03054923864210002, 0, 0, 0],
        [0, 0, 0, 1.5878082872294934e-90, 0.5376691530707719, 0.46026941860433956, 0.0020614283248885368, 0, 0],
        [0, 0, 0, 0, 1.8095080331014077e-135, 0.35637276744496565, 0.6425952579945047, 0.0010319745605297248, 0],
        [0, 0, 0, 0, 1.8095080331014077e-135, 0.35637276744496565, 0.6425952579945047, 0.0010319745605297248, 0]
    ]
}

/** もちろんPromise*/
export const main = $ => {
    loadDropTableData().then(obj => debugMain($, obj));
}

/** mainの続き　fetchを使わずにオフラインでデバッグできるmain関数としても使える*/
export const debugMain = ($, object) => {
    const options = {
        allowedRarities: $.options.allowedDropRarities ?? calcAllowedRarities($.options.leastRarity ?? 0, $.options.maxRarity ?? 6),
        chanceStr: $.options.baseChanceStr,
    }
    generateWhole(options, $.originId, object ?? testDropTableData)
}

/** AllowedRaritiesの指定がないとき計算する */
function calcAllowedRarities(leastRarity, maxRarity) {
    const arr = [];
    for (let i = 0; i < window.florr.rarity.length; i++) arr.push((leastRarity <= i) && (i <= maxRarity));
    console.log(arr);
    return arr;
}

/** mainのつづき */
function generateWhole(options, originId, allDropTableDatas) {
    //options.chanceStr, options.allowedRarities
    const originDiv = document.getElementById(originId);
    if (!allDropTableDatas.hasOwnProperty(options.chanceStr)) {
        originDiv.innerHTML = "このドロップ率はまだ登録されていません";
        return;
    }

    const dropTableData = calcFromAllowedRarities((x100(allDropTableDatas[options.chanceStr])), options.allowedRarities);
    const fc = calcFieldColumnOptions(dropTableData, options.allowedRarities);
    const TABLE = createDropTable(fc[0], fc[1], options.allowedRarities);
    originDiv.appendChild(TABLE);

}

function calcFieldColumnOptions(dropTableData, allowedRarity) {

    const fieldOptions = {};
    const columnOptionsArr = [];

    const petalWidth = window.florr.rarity.length;

    fieldOptions.rarity = { "type": "constant", "base": 0, "increase": 1, }
    columnOptionsArr.push({ name: "モブ＼ペタル", fieldId: "rarity", viewType: "rarity" });

    for (let petalRId = 0; petalRId < petalWidth; petalRId++) {
        if (!allowedRarity[petalRId]) continue;
        const petalRName = window.florr.rarity.name[window.florr.rarity.id[petalRId.toString()]]; //Common, Unusual...
        const uniqueDatas = [];
        for (let mobRId = 0; mobRId < window.florr.rarity.length; mobRId++) {
            uniqueDatas.push(dropTableData[mobRId][petalRId]);
        }
        fieldOptions[petalRName] = { type: "unique", uniqueDatas: uniqueDatas, };
        columnOptionsArr.push({ name: petalRName, viewType: "normal", fieldId: petalRName, last: "%", toFixed: 1, specialToFixedType: "chance" });
    }
    return [fieldOptions, columnOptionsArr];
}

function createDropTable(fieldOptions, columnOptionsArr, allowedRarities) {
    const TABLE = createStatusTable(fieldOptions, columnOptionsArr, { leastRarity: 0, TALENTS_FACTOR: [] });
    // const headFieldOptions = {rarity:{type:"unique",uniqueDatas:["モブ＼ペタル"]}}, headColumnOptionsArr = [{fieldId:"rarity"}];
    // for (let i = 0; i < window.florr.rarity.length; i++) {
    //     headFieldOptions["rarity" + i] = { type:"constant", base:i,increase:0,};
    //     headColumnOptionsArr.push({viewType:"rarity", fieldId: "rarity" + i});
    // }
    // const TABLEHEAD = createStatusTable(headFieldOptions, headColumnOptionsArr, { maxRarity:0, TALENTS_FACTOR:[] }).tBodies[0].firstChild;
    //TABLE.tBodies[0].insertBefore(TABLEHEAD, TABLE.tBodies[0].firstChild);
    return TABLE;
}

function calcFromAllowedRarities(dropTableData, allowedRarities) {
    dropTableData.forEach(e => {
        for (let j = window.florr.rarity.length - 1; j > -1; j--) {
            if (!allowedRarities[j]) {
                if (j !== 0) e[j - 1] += e[j];
                e[j] = 0;
            }
        }
    })
    return dropTableData;
}

function x100(dropTableData) {
    return dropTableData.map(e => e.map(f => f * 100));
}