import React, {useState} from 'react';

export default function PrintHello(props)
{

    const [name, setName] = useState("testName");

    return(
        <h2>{props.name}</h2>
    )
}