import {
    CHANGE_THEME_MOD,
    CHANGE_TOPNAV_COLOR,
    CHANGE_SIDEBAR_COLOR,
} from './../contexts/constant';
export const themeReducer = (state, action) => {
    const {
        type,
        payload: { themeMode, topNavColor, sidebarColor },
    } = action;

    switch (type) {
        case CHANGE_THEME_MOD:
            return {
                ...state,
                themeMode,
            };

        case CHANGE_TOPNAV_COLOR:
            return {
                ...state,
                topNavColor,
            };
        case CHANGE_SIDEBAR_COLOR:
            return {
                ...state,
                sidebarColor,
            };

        default:
            return state;
    }
};
