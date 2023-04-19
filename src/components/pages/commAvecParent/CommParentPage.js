import React from "react";
import Select from 'react-select';
import { useTranslation } from "react-i18next";
import MenuItemListP from '../../layout/cs_layout/menuItemList/MenuItemListP';
import classes from './CommParentPage.module.css';
import M_classes from './M_CommParentPage.module.css';
import MenuItemP from '../../layout/cs_layout/menuItem/MenuItemP';
import M from 'materialize-css';
import {isMobile} from 'react-device-detect';

import FormLayout from "../../layout/cs_layout/formLayout/FormLayout";
import NewComIntern from './subPages/NewComIntern';
import ConsultMsg from './subPages/ConsultMsg';
import RelationAvcParents from './subPages/RelationAvcParents';
import StagesAcad from './subPages/StagesAcad';
import OrientationEleves from "./subPages/OrientationEleves";
import EnvoiMsg from './subPages/EnvoiMsg';

import { useState,useContext } from "react";
import UiContext from '../../../store/UiContext'
import AppContext from "../../../store/AppContext";

/*import Enregistrement from "./subPages/Enregistrement";
import ListeDesEleves from "./subPages/ListeDesEleves";
import CarteScolaire from "./subPages/CarteScolaire";
import ChangementClasse from "./subPages/ChangementClasse";
import AdmissionClasseSup from "./subPages/AdmissionClasseSup";
import ProgressBar from 'react-bootstrap/ProgressBar';*/



function CommParentPage() {
      
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
        <div className= {(isMobile) ? M_classes.pageTitle : classes.pageTitle}>
          {(isMobile) ? null : <img src="images/Communications.png"  className={classes.imageMargin1} alt="my image"/>}
          <div className={(isMobile)? M_classes.titleHmself : classes.titleHmself}>
            {t("comm_with_parentsM")}
          </div>
        </div>

        <div className= {getCurrentContaintTheme()}>
          {(currentAppContext.enableProfiles["COMM_PARENT_A"]=='1') ? 
            <MenuItemListP minWtdhStyle={classes.size72Vw} libelle= {t("comm_interne")} theme={selectedTheme}>
              {(currentAppContext.enableProfiles["COMM_PARENT_A1"]=='1') ? <MenuItemP menuItemId ='45'  imgSource='images/NewComInterne.png'      libelle={t("nouv_communique")} itemSelected={showSideMenu} ></MenuItemP> : null}
              {(currentAppContext.enableProfiles["COMM_PARENT_A2"]=='1') ? <MenuItemP menuItemId ='46'  imgSource='images/ConsulterMsg.png'       libelle={t("consult_mesg")} itemSelected={showSideMenu}></MenuItemP> : null}
            </MenuItemListP>
            :
            null
          }

          {(currentAppContext.enableProfiles["COMM_PARENT_B"]=='1') ? 
            <MenuItemListP minWtdhStyle={classes.size72Vw} libelle= {t("comm_externe")}  theme={selectedTheme}>
              {(currentAppContext.enableProfiles["COMM_PARENT_B1"]=='1') ? <MenuItemP menuItemId ='47'  imgSource='images/RelationAvcParent.png'          libelle={t("Relation_parent")} itemSelected={showSideMenu}></MenuItemP> : null}
              {(currentAppContext.enableProfiles["COMM_PARENT_B2"]=='1') ? <MenuItemP menuItemId ='48'  imgSource='images/StageAcad.png'                  libelle={t("stages_acad")} itemSelected={showSideMenu}></MenuItemP> : null}
              {(currentAppContext.enableProfiles["COMM_PARENT_B3"]=='1') ? <MenuItemP menuItemId ='49'  imgSource='images/Orientation.png'                libelle={t("suivi_orientation")} itemSelected={showSideMenu}></MenuItemP> :null}
              {(currentAppContext.enableProfiles["COMM_PARENT_B4"]=='1') ? <MenuItemP menuItemId ='50'  imgSource='images/Sms.png'                        libelle={t("envoi_msg")} itemSelected={showSideMenu}></MenuItemP> : null}
            </MenuItemListP>
            :
            null
          }
        </div>
            
      <div id="side-menu" class="sidenav side-menu">
      <FormLayout formCode={curentMenuItemPId}>
          {curentMenuItemPId==45 && <NewComIntern/>      } 
          {curentMenuItemPId==46 && <ConsultMsg/>      }
          {curentMenuItemPId==47 && <RelationAvcParents/>    }
          {curentMenuItemPId==48 && <StagesAcad/>       }
          {curentMenuItemPId==49 && <OrientationEleves/>       } 
          {curentMenuItemPId==50 && <EnvoiMsg/>  }
         
          {/*curentMenuItemPId==8 && <EmploiDeTemps/>    */  }
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
export default CommParentPage