import React from 'react';

export default function Counter({ countNum, subtitle }): React.FunctionComponent{
    return (
        <>
            <div>{countNum}</div> 
            <span>{subtitle}</span>
        </>
    );
}