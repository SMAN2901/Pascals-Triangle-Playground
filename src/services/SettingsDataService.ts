import { LayoutData } from '../models/LayoutData';
import { TriangleView } from './../models/TriangleView';

export const getSettingsFromStorage = (): TriangleView => {
    let data = localStorage.getItem("settings");
    if(data) return JSON.parse(data);
    return new TriangleView();
}

export const saveSettingsToStorage = (s: TriangleView) => {
    let sData = JSON.stringify(s);
    localStorage.setItem("settings", sData);
}

export const getThemeFromStorage = (): string => {
    let theme = localStorage.getItem("theme");
    return theme || "dark";
}

export const saveThemeToStorage = (theme: string) => {
    localStorage.setItem("theme", theme);
}

export const getLayoutFromsStorage = (): LayoutData => {
    let data = localStorage.getItem("layout");

    return data ? JSON.parse(data) : {
        drawerOpen: true,
        settingsOpen: false,
        filtersOpen: false
    };
}

export const saveLayoutToStorage = (layout: LayoutData) => {
    let data = JSON.stringify(layout);
    localStorage.setItem("layout", data);
}