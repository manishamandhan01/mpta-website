export const daysButtonData = [
    {
        "label": "1D",
        "value": 1
    },
    {
        "label": "5D",
        "value": 5
    },
    {
        "label": "3M",
        "value": 90
    },
    {
        "label": "6M",
        "value": 180
    },
    {
        "label": "1Y",
        "value": 365
    },
    {
        "label": "5Y",
        "value": 1825
    }
]

export const multiplierButtonData = [
    {
        "label": "1 minute",
        "multiplier": "1",
        "timespan": "minute"
    },
    {
        "label": "5 minute",
        "multiplier": "5",
        "timespan": "minute"
    },
    {
        "label": "1 day",
        "multiplier": "1",
        "timespan": "day"
    }
]

export interface MultiplierTimespanModel {
    label: string;
    multiplier: string;
    timespan: string;
}

export const drawingToolIconsData = [
    { id: 1, paths: ["M18 15h8v-1h-8z", "M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"] },
    { id: 2, paths: ["M7.354 21.354l14-14-.707-.707-14 14z", "M22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"] },
    { id: 3, paths: ["M3 5h22v-1h-22z", "M3 17h22v-1h-22z", "M3 11h19.5v-1h-19.5z", "M5.5 23h19.5v-1h-19.5z", "M3.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM24.5 12c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"] },
    // Add more icons here as needed
];