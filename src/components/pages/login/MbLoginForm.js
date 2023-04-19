import React from 'react';
import classes from './MbLoginForm.module.css';
import {Link} from 'react-router-dom';

import { useTranslation } from "react-i18next";
import '../../../translation/i18n'
import axiosInstance from '../../../axios';

import { useState,useContext } from "react";
import UiContext from '../../../store/UiContext';
import AppContext from '../../../store/AppContext';
import { useHistory } from 'react-router-dom';

import {initFeaturesCode,initAppFeatureTable} from '../../Features/FeaturesCode';
import FeaturesCode from '../../Features/FeaturesCode';


var userProfile = ''
var profileAuthorisationString = ''
var ERROR_CODE;
function MbLoginForm(){

    const currentUiContext = useContext(UiContext);
    const currentAppContext = useContext(AppContext);
    const history = useHistory();
    const [passWordError,setPassWordError]=useState(false);
    
    //Cette constante sera lu lors de la configuration de l'utilisateur.
    const selectedTheme = currentUiContext.theme;
    const usrConnected = currentAppContext.usrIsLogged;
    const passWdCorrect = false;

    const { t, i18n } = useTranslation();
    
    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.id);
    };


    

    function getCurrentHeaderTheme()
    {  // Choix du theme courant
       switch(selectedTheme){
            case 'Theme1': return classes.Theme1_loginHeader + ' ' + classes.Theme1_header;
            case 'Theme2': return classes.Theme2_loginHeader + ' ' + classes.Theme2_header;
            case 'Theme3': return classes.Theme3_loginHeader + ' ' +classes.Theme3_header;
            default: return classes.Theme1_loginHeader + ' ' +classes.Theme1_header;
        }
    }

    function getCurrentContentTheme()
    {  // Choix du theme courant
       switch(selectedTheme){
            case 'Theme1': return classes.mainContentPosition;
            case 'Theme2': return classes.mainContentPosition;
            case 'Theme3': return classes.mainContentPosition;
            default: return classes.mainContentPosition;
        }
    }

    function getCurrentFooterTheme()
    {  // Choix du theme courant
       switch(selectedTheme){
            case 'Theme1': return classes.Theme1_footer;
            case 'Theme2': return classes.Theme2_footer;
            case 'Theme3': return classes.Theme3_footer;
            default: return classes.Theme1_footer;
        }
    }

    function getCurrentWidgetTemplateStyle()
    {  // Choix du theme courant
        switch(selectedTheme){
            case 'Theme1': return classes.Theme1_widget ;
            case 'Theme2': return classes.Theme2_widget;
            case 'Theme3': return classes.Theme3_widget;
            default: return classes.Theme1_widget;
        }
    }

function getWidgetContentStyle()
{  // Choix du theme courant
   switch(selectedTheme){
        case 'Theme1': return classes.Theme1_widget_content ;
        case 'Theme2': return classes.Theme2_widget_content ;
        case 'Theme3': return classes.Theme3_widget_content ;
        default: return classes.Theme1_widget_content ;
    }
}

function getFormHeaderStyle()
{ // Choix du theme courant
   switch(selectedTheme){
        case 'Theme1': return classes.Theme1_formHeader;
        case 'Theme2': return classes.Theme2_formHeader;
        case 'Theme3': return classes.Theme3_formHeader;
        default: return classes.Theme1_formHeader;
    }
}

function getErrorMessage(errorCode){
    switch(errorCode){
        case 401: return "incorrectPwd";
        case 500: return "server_error";
        default: return "incorrectPwd";
    }
}



const getRightsStringFromProfile = (profile) => {
     
    switch(profile) {
        
        case 'admin': { initFeaturesCode('1'); return('');} 
        
        case 'proviseur':  { initFeaturesCode('1'); return('');}
       
        case 'censeur':{ 
            initFeaturesCode('0'); 
            return('SCOLARITE*-COMM_PARENT*-FINANCE*-STATS*-CONFIG_A*-EXTRAS*');
        }  
       
        case 'surveillant': {
            initFeaturesCode('0');
            return('SCOLARITE_A2-SCOLARITE_B1-SCOLARITE_B3-SCOLARITE_B4-SCOLARITE_C*-SCOLARITE_E3-COMM_PARENT*-STATS*-CONFIG_A*-EXTRAS*');
        } 

        case 'econome': {
            initFeaturesCode('0'); 
            //return('SCOLARITE_A2-SCOLARITE_B1-FINANCE*-COMM_PARENT*-STATS*-CONFIG_B1-CONFIG_D1-EXTRAS*');
            return('FINANCE*-COMM_PARENT*-STATS*-CONFIG_B1-CONFIG_D1-EXTRAS*');
        }

        case 'enseignant': {
            initFeaturesCode('0'); 
            return('SCOLARITE_A2-SCOLARITE_A5-SCOLARITE_A6-SCOLARITE_B*-SCOLARITE_C*-SCOLARITE_D*-COMM_PARENT*-STATS*-CONFIG_A*-EXTRAS*');
        }

        case 'advisor': {
            initFeaturesCode('0'); 
            return('SCOLARITE_A2-SCOLARITE_A5-SCOLARITE_B1-SCOLARITE_B3-SCOLARITE_B4-SCOLARITE_C2-SCOLARITE_C3-SCOLARITE_D2-SCOLARITE_E3-COMM_PARENT*-STATS*-CONFIG_A*-EXTRAS*');
        }

    }
 
}
    function connectHandler()
    {   
        const loginText = document.getElementById('login').value;
        const passwordText = document.getElementById('password').value;
        
        axiosInstance
        .post(`token-get/`, {
            username: loginText,
            password: passwordText,
        },{headers:{}})
        .then((res) => {
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access');
            // history.push('/test');
            console.log(res.data);
            userProfile = 'admin';
            profileAuthorisationString = getRightsStringFromProfile(userProfile)
            
            currentAppContext.setInfoAnnees(res.data.info_annees);
            currentAppContext.setUsrConnected(loginText,userProfile);
            currentAppContext.setEnableProfiles(FeaturesCode);
            currentAppContext.setIdUser(res.data.id_user);
            currentAppContext.setIdEtabInit(res.data.id_etab_init);
            currentAppContext.setActivatedYear(res.data.activated_year);
            currentAppContext.setInfoSetabs(res.data.info_setabs);
            currentAppContext.setInfoCycles(res.data.info_cycles);
            currentAppContext.setInfoNiveaux(res.data.info_niveaux);
            currentAppContext.setInfoClasses(res.data.info_classes);
            currentUiContext.updateFirstLoad(true);
            profileAuthorisationString = getRightsStringFromProfile(userProfile)
            console.log(currentAppContext);
            history.replace('/');

        },(res)=>{
            ERROR_CODE = res.response.status;
            setPassWordError(true);
        });
     
    }
    

        return(
        <div className= {classes.loginContainer}>
            <div className= {getCurrentHeaderTheme()}>
                <img src='images/cursusLogo.png'  alt='AppLogo' className= {classes.logoStyle}></img>
            </div>

            <div className= {getCurrentWidgetTemplateStyle()+ ' '+ getWidgetContentStyle() }>
                    
                    <div id='fr' onClick={changeLanguage} className={classes.langButton}> 
                        <img src="images/drapeauFrance.png" id='fr' width ='23px' height='23px' alt="my image" onClick={changeLanguage}  />   
                    </div>
                    
                    <div id='en' onClick={changeLanguage} className={classes.langButton}>
                        < img src="images/drapeauAnglais.png" id='en' width ='23px' height='23px' alt="my image" onClick={changeLanguage}/>  
                    </div> 
            </div>
            
            <div className= {classes.loginMainContent}>
                <div className={'card ' + ' '+ getCurrentContentTheme()}>
                    <div className={getFormHeaderStyle()}>
                       {t("Connexion")} 
                    </div>
                    <form class={"container section" +' '+ classes.formContent}>
                        <h8><b> {t("acceder_espace" )}</b></h8>
                        
                        <div class="input-field">
                            <input id="login" type="text" class="validate"/>
                            <label for="login">{t("login" )}</label>
                        </div>
                        <div class="input-field">
                            <input id="password" type="password" class="validate"/>
                            <label for="password">{t("password" )}</label>
                        </div>
                       
                        <Link className= {classes.linkStyle}> <i>{t("forgetPwd")}</i></Link>
                        { passWordError ? 
                            <p className={classes.errorMsgStyle}> {t(getErrorMessage(ERROR_CODE))}</p> 
                            : null
                        }
                    </form>
                    

                    <div class="input-field center">
                            <button class="btn-small button" onClick={connectHandler}>Connexion</button>
                    </div>
                    
                </div>
            </div>

            <div className= {getCurrentFooterTheme()}>
                <div className={classes.copyRight}>
                    <h7> © Copyright 2022 </h7>
                </div>
                
                <div className={classes.aboutApp}> 
                    <section className={classes.aboutAppTextStyle}>
                        BOGEDEV Corporation  
                    </section> 
                    <section className={classes.aboutAppTextStyle}> 
                        {t("rightsReserve")} 
                    </section>
                </div>
            <div>  
                    
        </div>
              
    </div>
</div>
    );
}
export default MbLoginForm;