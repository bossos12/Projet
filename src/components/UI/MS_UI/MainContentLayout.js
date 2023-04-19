import React from 'react';
import { useContext } from "react";
import UiContext from '../../../store/UiContext';

import classes from './MsLayout.module.css';


function MainContentLayout(props) {
    
    const currentUiContext = useContext(UiContext);

    //Cette constante sera lu lors de la configuration de l'utilisateur.
    const selectedTheme = currentUiContext.theme;

    function getCurrentTheme(){
       // Choix du theme courant
       return classes.mainDisplayPosition + ' '+ classes.mainContentStyle;
    }
  
    return (
        <div className= {getCurrentTheme()}>
            {props.children}
        </div>
    );

}
export default MainContentLayout; 