import React, { useEffect, useRef } from "react";
// import NewComponent from './oorke.jsx'
export default function New() {
    function unmountFunction(){
        alert("component is un mounted");
    }

    function mountFunction(){
        alert("the componetn is mounted");
        return unmountFunction;
    }
    useEffect(mountFunction , [])
}
