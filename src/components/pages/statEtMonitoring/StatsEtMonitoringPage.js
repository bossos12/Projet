import React from "react";
import Select from 'react-select';
import { useTranslation } from "react-i18next";
import MenuItemListP from '../../layout/cs_layout/menuItemList/MenuItemListP';
import classes from './StatsEtMonitoringPage.module.css';
import M_classes from './M_StatsEtMonitoringPage.module.css';
import MenuItemP from '../../layout/cs_layout/menuItem/MenuItemP';
import M from 'materialize-css';
import {isMobile} from 'react-device-detect';


import FormLayout from '../../layout/cs_layout/formLayout/FormLayout';
import TauxDeReussite from './subPages/TauxDeReussite';
import EvolutionEffectifs from './subPages/EvolutionEffectifs';
import EvolutionNiveauAcad from './subPages/EvolutionNiveauAcad';
import TauxCouvertureProgs from './subPages/TauxCouvertureProgs';
import EvolutionBudget from './subPages/EvolutionBudget';
import EvolutionCommParents from './subPages/EvolutionCommParents';
import TauxInvestissmts from './subPages/TauxInvestissmts';

import { useState,useContext } from "react";
import UiContext from '../../../store/UiContext';
import AppContext from "../../../store/AppContext";

/*import Enregistrement from "./subPages/Enregistrement";
import ListeDesEleves from "./subPages/ListeDesEleves";
import CarteScolaire from "./subPages/CarteScolaire";
import ChangementClasse from "./subPages/ChangementClasse";
import AdmissionClasseSup from "./subPages/AdmissionClasseSup";
import ProgressBar from 'react-bootstrap/ProgressBar';*/


function StatsEtMonitoringPage() {
      
  const { t, i18n } = useTranslation();
  const currentUiContext = useContext(UiContext);
  const currentAppContext = useContext(AppContext);
  
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
  { // Choix du theme courant
    if(isMobile) {
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
        {(isMobile) ? null : <img src="images/monitoring.png"  className={classes.imageMargin1} alt="my image"/>}
        <div className = {(isMobile)? M_classes.titleHmself : classes.titleHmself}>
            {t("stats_and_monitoringM")}
        </div>
      </div>

      <div className= {getCurrentContaintTheme()}>
        {(currentAppContext.enableProfiles["STATS_A"]=='1') ? 
          <MenuItemListP minWtdhStyle={classes.size72Vw} libelle= {t("acad_stats")} theme={selectedTheme}>
            {(currentAppContext.enableProfiles["STATS_A1"]=='1') ? <MenuItemP menuItemId ='31'  imgSource='images/EvolutionReussite.png'     libelle={t("taux_reussite")}    itemSelected={showSideMenu} ></MenuItemP> : null}
            {(currentAppContext.enableProfiles["STATS_A2"]=='1') ? <MenuItemP menuItemId ='32'  imgSource='images/EvolutionEffectifs.png'    libelle={t("evolution_effectifs")}    itemSelected={showSideMenu}></MenuItemP> : null}
            {(currentAppContext.enableProfiles["STATS_A3"]=='1') ? <MenuItemP menuItemId ='33'  imgSource='images/EvolutionNiveauAcad.png'   libelle={t("evolution_niv_acad")}    itemSelected={showSideMenu}></MenuItemP> : null}
            {(currentAppContext.enableProfiles["STATS_A4"]=='1') ? <MenuItemP menuItemId ='34'  imgSource='images/TauxCouvProg.png'          libelle={t("couverture_programs")}    itemSelected={showSideMenu}> </MenuItemP> : null}
          </MenuItemListP>
          :
          null
        }

        {(currentAppContext.enableProfiles["STATS_B"]=='1') ? 
          <MenuItemListP minWtdhStyle={classes.size72Vw}  libelle= {t("non_acad_stats")} theme={selectedTheme}>
            {(currentAppContext.enableProfiles["STATS_B1"]=='1') ?  <MenuItemP menuItemId ='35'  imgSource='images/EvolutionBudget.png'      libelle={t("evolution_budget")}  itemSelected={showSideMenu}></MenuItemP> :null}
            {(currentAppContext.enableProfiles["STATS_B2"]=='1') ?  <MenuItemP menuItemId ='36' imgSource='images/TauxInteractionPrt.png'    libelle={t("evolution_comParents")}  itemSelected={showSideMenu}></MenuItemP> :null}
            {(currentAppContext.enableProfiles["STATS_B3"]=='1') ?  <MenuItemP  menuItemId ='37' imgSource='images/TauxInvestissement.png'   libelle={t("taux_realisation_invest")}  itemSelected={showSideMenu}></MenuItemP> : null}
            {/*<MenuItemP libelle='Admission en claase2 ' itemSelected={showSideMenu}></MenuItemP>*/}
          </MenuItemListP>
          :
          null
        }

      </div>
            
      <div id="side-menu" class="sidenav side-menu">
        <FormLayout formCode={curentMenuItemPId}>
            {curentMenuItemPId==31 && <TauxDeReussite/>          } 
            {curentMenuItemPId==32 && <EvolutionEffectifs/>      }
            {curentMenuItemPId==33 && <EvolutionNiveauAcad/>     }
            {curentMenuItemPId==34 && <TauxCouvertureProgs/>     }
            {curentMenuItemPId==35 && <EvolutionBudget/>         } 
            {curentMenuItemPId==36 && <EvolutionCommParents/>    }
            {curentMenuItemPId==37 && <TauxInvestissmts/>        }
        </FormLayout>
          {/*curentMenuItemPId==1 ? <Enregistrement/> : null}
        {curentMenuItemPId==2 ? <ListeDesEleves/> : null}
        {curentMenuItemPId==3 ? <CarteScolaire/> : null}
        {curentMenuItemPId==4 ? <ChangementClasse/> : null}
        {curentMenuItemPId==5 ? <AdmissionClasseSup/> : null*/}
      </div>
    </div>
  );
}
export default StatsEtMonitoringPage;