import React from "react";
import {isMobile} from 'react-device-detect';

import { useTranslation } from "react-i18next";
import MenuItemListP from '../../layout/cs_layout/menuItemList/MenuItemListP';
import classes from './ExtrasPages.module.css';
import M_classes from './M_ExtrasPages.module.css';


import MenuItemP from '../../layout/cs_layout/menuItem/MenuItemP';
import M from 'materialize-css';


import { useState,useContext } from "react";
import UiContext from '../../../store/UiContext'

/*import Enregistrement from "./subPages/Enregistrement";
import ListeDesEleves from "./subPages/ListeDesEleves";
import CarteScolaire from "./subPages/CarteScolaire";
import ChangementClasse from "./subPages/ChangementClasse";
import AdmissionClasseSup from "./subPages/AdmissionClasseSup";
import ProgressBar from 'react-bootstrap/ProgressBar';*/



function ExtrasPages() {
       
  const { t, i18n } = useTranslation();
  const currentUiContext = useContext(UiContext);
  
  //Cette constante sera lu lors de la configuration de l'utilisateur.
  const selectedTheme = currentUiContext.theme;
  const [curentMenuItemPId,setMenuItemPId]=useState(0);
  
  function showSideMenu(e) {
    const itemId = e.currentTarget.id
    setMenuItemPId(itemId);
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
  }
  
  
  function getCurrentContaintTheme()
  {  // Choix du theme courant
    if(isMobile){
      switch(selectedTheme){
        case 'Theme1': return M_classes.Theme1_mainContentPosition ;
        case 'Theme2': return M_classes.Theme2_mainContentPosition ;
        case 'Theme3': return M_classes.Theme3_mainContentPosition ;
        default: return M_classes.Theme1_mainContentPosition ;
      }

    } else {
      switch(selectedTheme){
        case 'Theme1': return classes.Theme1_mainContentPosition ;
        case 'Theme2': return classes.Theme2_mainContentPosition ;
        case 'Theme3': return classes.Theme3_mainContentPosition ;
        default: return classes.Theme1_mainContentPosition ;
      }

    }
    
    
  }


    return ( 
        <div className= {classes.viewContent}>
        <div className = {(isMobile) ? M_classes.pageTitle : classes.pageTitle}>
            {(isMobile) ? null : <img src="images/extraFeature.png"  className={classes.imageMargin1} alt="my image"/>}
          <div className ={(isMobile)? M_classes.titleHmself : classes.titleHmself}>
            {t("extrasM")}
          </div>
        </div>
  
        <div className= {getCurrentContaintTheme()}>
          <MenuItemListP minWtdhStyle={classes.size72Vw} libelle= 'Enregistrement Et Admissions en Classe Superieure' theme={selectedTheme}>
            <MenuItemP menuItemId ='1'  imgSource='images/NewStudent.png'        libelle='Enregistrement Des Eleves' itemSelected={showSideMenu} ></MenuItemP>
            <MenuItemP menuItemId ='2'  imgSource='images/ListStudent.png'       libelle='Consultation Des Listes Des Eleves' itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP menuItemId ='3'  imgSource='images/ChangemtClass.png'     libelle='Changement De Classe'itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP menuItemId ='4'  imgSource='images/PrintSchoolCard.png'   libelle='Generation De Cartes Scolaires' itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP menuItemId ='4'  imgSource='images/ConseilClasse.png'     libelle='Conseil De Classe' itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP menuItemId ='6'  imgSource='images/ClassSup.png'          libelle='Admission En classe superieure' itemSelected={showSideMenu}></MenuItemP>
          </MenuItemListP>

          <MenuItemListP minWtdhStyle={classes.size72Vw}  libelle= 'Emplois de Temps, Cours Et Programmes' theme={selectedTheme}>
            <MenuItemP imgSource='images/Schedule.png'           libelle='Emploi De Temps' itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/FicheProgession.png'    libelle='Fiche De Progression' itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/ProgramClasse.png'      libelle='Programme des Classes' itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/CahierTexte.png'        libelle='Cahier De Texte' itemSelected={showSideMenu}></MenuItemP>
            {/*<MenuItemP libelle='Admission en claase2 ' itemSelected={showSideMenu}></MenuItemP>*/}
          </MenuItemListP>
  
          <MenuItemListP minWtdhStyle={classes.size72Vw} libelle= 'Discipline Et Assiduite' theme={selectedTheme}>
            <MenuItemP imgSource='images/Appel.png'        libelle="Faire l'Appel"itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/CahierTexte.png'  libelle='Conseil De Discipline'itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/Studentprofile.png'  libelle='Situation Disciplinaire des Eleves'itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/BilletEntree.png' libelle="Billet D'Entree" itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/BilletSortie.png' libelle='Billet De Sortie' itemSelected={showSideMenu}></MenuItemP>
          </MenuItemListP>
  
          <MenuItemListP minWtdhStyle={classes.size72Vw} libelle= 'Evaluations De Classe Et Notes' theme={selectedTheme}>
            <MenuItemP imgSource='images/NewEvaluation.png' libelle='Nouvelle Evaluation' itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/SaveNotes.png'     libelle='Notes Aux Evaluatons'itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/PrintStudentReport.png'  libelle='Generation De Bulletin de Notes'itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/LookStudentReport.png'  libelle='Consultation Bulletin de Notes' itemSelected={showSideMenu}></MenuItemP>
            {/*<MenuItemP imgSource='images/BilletSortie.png'  libelle='Admission en claase ' itemSelected={showSideMenu}></MenuItemP>*/}
          </MenuItemListP>
  
  
          <MenuItemListP minWtdhStyle={classes.size72Vw} libelle= 'Examens officiels' theme={selectedTheme}>
            <MenuItemP imgSource='images/NewEvaluation.png' libelle='Nouvel Examen Officiel'itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/SaveNotes.png'  libelle='Saisi Des Resultats Aux Examens'itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/ListAdmis.png'  libelle='Liste Des Admis Aux Examens'itemSelected={showSideMenu}></MenuItemP>
            {/*<MenuItemP imgSource='images/BilletSortie.png'  libelle='Changement de classe' itemSelected={showSideMenu}></MenuItemP>
            <MenuItemP imgSource='images/BilletSortie.png'  libelle='Admission en claase ' itemSelected={showSideMenu}></MenuItemP>*/}
          </MenuItemListP>
        
        </div>
              
        <div id="side-menu" class="sidenav side-menu">
           {/*curentMenuItemPId==1 ? <Enregistrement/> : null}
           {curentMenuItemPId==2 ? <ListeDesEleves/> : null}
           {curentMenuItemPId==3 ? <CarteScolaire/> : null}
           {curentMenuItemPId==4 ? <ChangementClasse/> : null}
        {curentMenuItemPId==5 ? <AdmissionClasseSup/> : null*/}
        </div>
      </div>
    );
}
export default ExtrasPages;