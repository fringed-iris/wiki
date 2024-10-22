export const options = {
    name: "Cotton",
    baseHealth: 6,
    reloadTime: 1.5,
    leastRarity: 0,

    fieldOptions: {
        healthSum: {
            type: "heal",
            base: 6,
        },

        healthPerSec: {
            type: "FoverF",
            baseFieldId: "healthSum",
            secondBaseFieldId: "reload",
        },

        reloadPlus: {
            type: "FplusB",
            base: 1,
            baseFieldId: "reload",
        },

        healthPerSecPlus: {
            type: "FoverF",
            baseFieldId: "healthSum",
            secondBaseFieldId: "reloadPlus",
        }
    },

    specialColumnOptionsArr: [
        {
            fieldId: "healthPerSec",
            name: "秒間吸収量理論値",
            last: "/s",
        },
        {
            fieldId: "healthPerSecPlus",
            width: 100,
            name: "消費に1秒かかる場合の秒間吸収量",
            last: "/s",
        }
    ]
};