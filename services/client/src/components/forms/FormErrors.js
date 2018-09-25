import React from 'react';
import './FormErrors.css';
export default ({formRules})=>{
    return(
        <div>
            <ul className="validation-list">
            {
                formRules&&formRules.map((rule)=>{
                    return <li
                        className={rule.valid ? "success":"error"}
                        key={rule.id}
                        >{rule.name}
                    </li>
                })
            }
            </ul>
            <br/>
        </div>
    )

}