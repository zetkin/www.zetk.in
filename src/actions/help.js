import * as types from '.';
import cookies from 'browser-cookies';


export function setHelpSeen() {
    if (typeof window != 'undefined') {
        cookies.set('wwwHelpSeen', JSON.stringify(true));
    }

    return {
        type: types.SET_HELP_SEEN,
        payload: true,
    };
}

export function setHelpDismissed() {
    if (typeof window != 'undefined') {
        cookies.set('wwwHelpDismissed', JSON.stringify(true));
    }

    return {
        type: types.SET_HELP_DISMISSED,
        payload: true,
    }
}
