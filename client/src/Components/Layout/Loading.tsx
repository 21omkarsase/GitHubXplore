import React from 'react';
import classes from './Loading.module.css';

const Loading: React.FC = () => {
    return (
        <div className={classes['loader-container']}>
            <div className={classes.spinner}></div>
            <div className={classes['loader-text']}>Loading...</div>
            <div className={classes['loader-indicator']}></div>
        </div>
    );
};

export default Loading;