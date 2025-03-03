import { debugFunction } from "../scripts/util/statustable.js";

//debugFunction();

const lightning = {
    name: "Lightning",
    baseHealth: 20,
    baseDamage: 12,
    reloadTime: 2.5,
    calcDPS: true,
    leastRarity: 1,
    specialStatus: [
        {
            id: "chaintime",
            name: "連鎖数",
            type: "unique",
            last: "",
            uniqueDatas: [2, 3, 4, 5, 6, 7, 8, 9],
            toFixed: 0
        },
        {
            id: "finalFinalDamage",
            type: "FtimesF",
            baseFieldId: "finalDamage",
            secondBaseFieldId: "chaintime",
            isHidden: true,
        },
    ],
    columnOptions: {
        damage: {
            name: "総攻撃力",
            viewType: "damage",
            fieldId: "finalFinalDamage",
            secondFieldId: "finalDamage",
            isHidden: false,
        }
    }
}

const dahlia = {
    name: "Dahlia",
    petalCount: 3,
    baseHealth: 5,
    baseDamage: 5,
    reloadTime: 1.5,
    secondReloadTime: 1.5,
    calcDPS: false,
    leastRarity: 1,
    fieldOptions: {
        singleHeal: {
            type: "heal",
            base: 1.25,
            relatedTalent: "medic",
        },
        totalHeal: {
            type: "FtimesF",
            baseFieldId: "singleHeal",
            secondBaseFieldId: "petalCount2",
        },
    },

    specialColumnOptionsArr: [
        {
            name: "総回復量",
            viewType: "poison",
            fieldId: "totalHeal",
            secondFieldId: "reloadSum",
        }
    ]
};

export const petalStatusOptions = {
    name: "test",
    baseHealth: 10,
    fieldOptions: {
        damage: {
            type: "unique",
            uniqueDatas: [0,1,2,3,4,5,6,7],
        }
    }
}

export const mobStatusOptions = {
    name: "QueenAnt",
    baseHealth: 250,
    baseDamage: 10,
    leastRarity: 0,
    specialStatus: [
        {
            name: "備考", last: "", width: 140, type: "unique", uniqueDatas: ["なし", "なし", "なし", "なし", "なし", "なし", "なし", "なし",]
        }
    ],
}