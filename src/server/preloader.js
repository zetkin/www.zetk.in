import express from 'express';
import immutable from 'immutable';

import { configureStore } from '../store';
import { createLocalizeHandler } from './locale';


export default (messages) => {
    const preloader = express();
    const localizeHandler = createLocalizeHandler(messages);

    // TODO: Change scope depending on URL
    preloader.use(localizeHandler());

    preloader.use((req, res, next) => {
        let initialState = immutable.Map({
            intl: {
                locale: req.intl.locale,
                messages: req.intl.messages,
            },
        });

        req.store = configureStore(initialState, req.z);

        next();
    });

    return preloader;
}
