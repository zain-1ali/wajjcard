import React, { useEffect, useState } from 'react'

function ReadmoreLess(props) {
const[isReadMore,setisReadMore]=useState(false);

const [bussinessinfo,setbussinessInfo]=useState(props.info);

useEffect(()=>{
    setbussinessInfo(props.info)
},[props.info])
    if(bussinessinfo!==undefined||null||false){
        return (
            <>
            { isReadMore ? bussinessinfo:bussinessinfo.substring(0,135)}
            &nbsp;&nbsp;
            { bussinessinfo.length>130?
            (
                !isReadMore?
                     <a style={{"textDecoration":"none"}} href='#' onClick={()=>setisReadMore(prev=>!prev)}>See more</a>
                    :
                    <a style={{"textDecoration":"none"}} href='#' onClick={()=>setisReadMore(prev=>!prev)}>See less</a>
            )
            
            :
            (
                null
            )  
            }
            
            </>
                       
          );
    }else{
        return (
            <>
                  Bussiness Info
            </>
            
          );
    }
}

export default ReadmoreLess