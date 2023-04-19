import React from "react";
import Select from 'react-select';
import { useTranslation } from "react-i18next";
import MenuItemListP from '../../layout/cs_layout/menuItemList/MenuItemListP';
import classes from './ScolaritePage.module.css';
import M_classes from './M_ScolaritePage.module.css';
import MenuItemP from '../../layout/cs_layout/menuItem/MenuItemP';
import M from 'materialize-css';

import { useState,useContext } from "react";
import UiContext from '../../../store/UiContext'

import Enregistrement from "./subPages/Enregistrement";
import ListeDesEleves from "./subPages/ListeDesEleves";
import CarteScolaire from "./subPages/CarteScolaire";
import ChangementClasse from "./subPages/ChangementClasse";
import AdmissionClasseSup from "./subPages/AdmissionClasseSup";
import EmploiDeTemps from "./subPages/EmploiDeTemps";
import CahierDeTexte from "./subPages/CahierDeTexte";
import ConseilClasse from "./subPages/ConseilClasse";
import FicheProgession from "./subPages/FicheProgession";
import ProgramClasse from "./subPages/ProgramClasse";
import Appel from "./subPages/Appel";
import ConseilDiscipline from "./subPages/ConseilDiscipline";
import Studentprofile from "./subPages/Studentprofile";
import BilletEntree from "./subPages/BilletEntree";
import BilletSortie from "./subPages/BilletSortie";
import NewEvaluation from "./subPages/NewEvaluation";
import SaveNotes from "./subPages/SaveNotes";
import PrintStudentReport from "./subPages/PrintStudentReport";
import LookStudentReport from "./subPages/LookStudentReport";
import NewOfficialExam from "./subPages/NewOfficialExam";
import SaveExamNotes from "./subPages/SaveExamNotes";
import ListAdmis from "./subPages/ListAdmis";
import SuiviFicheProgress from "./subPages/SuiviFicheProgress";
import ConsultEmploiDeTemps from "./subPages/ConsultEmploiDeTemps";

import ProgressBar from 'react-bootstrap/ProgressBar';
import AppContext from "../../../store/AppContext";
import FormLayout from "../../layout/cs_layout/formLayout/FormLayout"
import {isMobile} from 'react-device-detect';
import MsgBox from '../../msgBox/MsgBox';

import AddFicheProgess from './modals/AddFicheProgess'
import BackDrop from "../../backDrop/BackDrop";
import axiosInstance from "../../../axios";


var constMsg ={
  msgShown:false,
  msgType:'info',
  msgTitle:"",
  message:"",   
}

function ScolaritePage(){
    
  const { t, i18n } = useTranslation();
  const currentUiContext = useContext(UiContext);
  const currentAppContext = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState(0); //0 = close, 1=creation, 2=modif, 3=consult, 4=impression 
  const [msg, showMsg]= useState({constMsg})
  
  //Cette constante sera lu lors de la configuration de l'utilisateur.
  const selectedTheme = currentUiContext.theme;
  const [curentMenuItemPId,setMenuItemPId]=useState(0);

  //Necessaire pour l'emploi de temps
  let listMatieres = [];
  let matieres = [];
  let classess = [];
  let indexClasse = -1;
  let emploiDeTemps = [];
  let listProfs = [];
  let tab_jours = [];
  let tab_periodes = [];
  let tab_creneau_pause = [];
  let tab_valeur_horaire = [];

  
  function showSideMenu(e) {
    const itemId = e.currentTarget.id
    setMenuItemPId(itemId);
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});

    var select1 = document.getElementById('selectId1');
    var select2 = document.getElementById('selectId2');
    var select3 = document.getElementById('selectClass1');
    var select4 = document.getElementById('selectClass2');
    var select5 = document.getElementById('selectPeriod1');

    

    if(select1 != null && select1 != undefined){
      select1.options[0].label = (i18n.language=='fr') ? ' choisir ' :' choose ';

    }

    if(select2 != null && select2 != undefined){
      select2.options[0].label = (i18n.language=='fr') ? ' choisir ' :' choose ';

    }

    if(select3 != null && select3 != undefined){
      select3.options[0].label = (i18n.language=='fr') ? ' Choisir une classe ' :'  Select a class  ';

    }

    if(select4 != null && select4 != undefined){
      select4.options[0].label = (i18n.language=='fr') ? ' Choisir une classe ' :'  Select a class  ';

    }

    if(select5 != null && select5 != undefined){
      select5.options[0].label = (i18n.language=='fr') ? ' Choisir une periode ' :'  Select a period  ';

    }

  }


  function showSideMenu2(e) {
    const itemId = e.currentTarget.id
    setMenuItemPId(itemId);
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});

    axiosInstance.post(`get-current-emploi-de-temps/`, {
              id_sousetab: currentAppContext.currentEtab
          }).then((res)=>{
              console.log(res.data);
          res.data.matieres.map((m)=>{matieres.push(m)});
          res.data.classes.map((c)=>{classess.push(c)});
          res.data.ListMatieres.map((lm)=>{listMatieres.push(lm)});
          res.data.emploiDeTemps.map((em)=>{emploiDeTemps.push(em)});
          res.data.listProfs.map((lp)=>{listProfs.push(lp)});
          res.data.TAB_JOURS.map((j)=>{tab_jours.push(j)});
          res.data.TAB_PERIODES.map((p)=>{tab_periodes.push(p)});
          res.data.TAB_CRENEAU_PAUSE.map((p)=>{tab_creneau_pause.push(p)});
          res.data.TAB_VALEUR_HORAIRE.map((vh)=>{tab_valeur_horaire.push(vh)});
          
          currentUiContext.setClasseEmploiTemps(classess);
          currentUiContext.setListMatieres(listMatieres);
          currentUiContext.setListProfs(listProfs);
          currentUiContext.setIndexClasse(indexClasse);
          currentUiContext.setMatiereSousEtab(matieres);
          currentUiContext.setTAB_JOURS(tab_jours);
          currentUiContext.setTAB_PERIODES(tab_periodes);
          currentUiContext.setTAB_VALEUR_HORAIRE(tab_valeur_horaire);
          currentUiContext.setEmploiDeTemps(emploiDeTemps);
          currentUiContext.setTAB_CRENEAU_PAUSE(tab_creneau_pause);

          if(tab_valeur_horaire.length>0){
          currentUiContext.setIntervalleMaxTranche(tab_valeur_horaire[0]+"_"+tab_valeur_horaire[tab_valeur_horaire.length-1]);
        }
    })      
    
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

  function addNewStudent(){

  }

  function modifyStudent(){

  }

  function quitForm(){
    setModalOpen(0);
  }

  function showFicheView(){
    setModalOpen(3);
  }
  
  return (

    <div className= {classes.viewContent}>
      {(modalOpen!=0) && <BackDrop/>}
      {(modalOpen >0 && modalOpen<4) && <AddFicheProgess currentClasseLabel={'6eA4'} currentClasseId={2} formMode= {(modalOpen==1) ? 'creation': (modalOpen==2) ?  'modif' : 'consult'}  actionHandler={(modalOpen==1) ? addNewStudent : modifyStudent} cancelHandler={quitForm} />}
      <div className= {(isMobile)?  M_classes.pageTitle  : classes.pageTitle}>
        {(isMobile) ? null:< img src="images/scolariteP.png"  className={classes.imageMargin1} alt="my image"/>}
        <div className={(isMobile)? M_classes.titleHmself : classes.titleHmself}>         
          {t("scolariteM")}
        </div>
      </div>

      <div className= {getCurrentContaintTheme()}>
      {(currentAppContext.enableProfiles["SCOLARITE_A"]=='1') ? 
        <MenuItemListP minWtdhStyle={classes.size72Vw}  libelle= {t("enreg_admis")} theme={selectedTheme}>
          {(currentAppContext.enableProfiles["SCOLARITE_A1"]=='1') ?   <MenuItemP menuItemId ='1'  imgSource='images/NewStudent.png'        libelle={t("add_student")} itemSelected={showSideMenu} ></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_A2"]=='1') ?   <MenuItemP menuItemId ='2'  imgSource='images/ListStudent.png'       libelle={t("consult_lists")} itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_A3"]=='1') ?   <MenuItemP menuItemId ='3'  imgSource='images/ChangemtClass.png'     libelle={t("changemnt_class")} itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_A4"]=='1') ?   <MenuItemP menuItemId ='4'  imgSource='images/PrintSchoolCard.png'   libelle={t("gen_cartes")} itemSelected={showSideMenu} customImg={true} customImgStyle={classes.customimgStyle1} ></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_A5"]=='1') ?   <MenuItemP menuItemId ='5'  imgSource='images/ConseilClasse.png'     libelle={t("conseils_classses")} itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_A6"]=='1') ?   <MenuItemP menuItemId ='6'  imgSource='images/ClassSup.png'          libelle={t("classes_sup")} itemSelected={showSideMenu}></MenuItemP> : null}
        </MenuItemListP>
        :
        null
      }

      {(currentAppContext.enableProfiles["SCOLARITE_B"]=='1') ?
        <MenuItemListP minWtdhStyle={classes.size72Vw}   libelle= {t("schedule_courses")} theme={selectedTheme}>
          {(currentAppContext.enableProfiles["SCOLARITE_B1"]=='1') ? <MenuItemP menuItemId ='7' imgSource='images/Schedule.png'              libelle={t("emploi_temps")}        itemSelected={showSideMenu2}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_B1"]=='1') ? <MenuItemP menuItemId ='52' imgSource='images/Schedule.png'             libelle={t("consult_ET")}          itemSelected={showSideMenu2}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_B2"]=='1') ? <MenuItemP isModal={true} menuItemId ='8' imgSource='images/FicheProgession.png'       libelle={t("fiches_progression")}  itemSelected={showFicheView}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_B2"]=='1') ? <MenuItemP menuItemId ='51' imgSource='images/FicheProgession.png'      libelle={t("suivi_fiche_p")}       itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_B2"]=='1') ? <MenuItemP menuItemId ='9' imgSource='images/ProgramClasse.png'         libelle={t("programmes_classes")}  itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_B2"]=='1') ? <MenuItemP menuItemId ='10' imgSource='images/CahierTexte.png'          libelle={t("cahier_textes")}       itemSelected={showSideMenu}></MenuItemP> : null}
          
          {/*<MenuItemP libelle='Admission en claase2 ' itemSelected={showSideMenu}></MenuItemP>*/}
        </MenuItemListP>
        :
        null
      }

        
      {(currentAppContext.enableProfiles["SCOLARITE_C"]=='1') ?
        <MenuItemListP minWtdhStyle={classes.size72Vw} libelle= {t("discipline_assiduite")} theme={selectedTheme}>
          {(currentAppContext.enableProfiles["SCOLARITE_C1"]=='1') ? <MenuItemP menuItemId ='11'  imgSource='images/Appel.png'              libelle={t("faire_appel")}              itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_C1"]=='1') ? <MenuItemP menuItemId ='53'  imgSource='images/Appel.png'              libelle={t("consult_appel")}            itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_C2"]=='1') ? <MenuItemP menuItemId ='12'  imgSource='images/ConseilDiscipline.png'  libelle={t("conseil_discipline")}       itemSelected={showSideMenu} customImg={true} customImgStyle={classes.customimgStyle3}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_C3"]=='1') ? <MenuItemP menuItemId ='13'  imgSource='images/Studentprofile.png'     libelle={t("situation_eleve")}          itemSelected={showSideMenu} customImg={true} customImgStyle={classes.customimgStyle2}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_C4"]=='1') ? <MenuItemP menuItemId ='14'  imgSource='images/BilletEntree.png'       libelle={t("billet_entree")}            itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_C5"]=='1') ? <MenuItemP menuItemId ='15'  imgSource='images/BilletSortie.png'       libelle={t("billet_sortie")}            itemSelected={showSideMenu}></MenuItemP> : null}
        </MenuItemListP>
        :
        null
      }

      {(currentAppContext.enableProfiles["SCOLARITE_D"]=='1') ?
        <MenuItemListP minWtdhStyle={classes.size72Vw} libelle= {t("devoir_notes")} theme={selectedTheme}>
          {(currentAppContext.enableProfiles["SCOLARITE_D1"]=='1') ? <MenuItemP menuItemId ='16' imgSource='images/NewEvaluation.png'       libelle={t("new_evaluation")}              itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_D2"]=='1') ? <MenuItemP menuItemId ='17' imgSource='images/SaveNotes.png'           libelle={t("saisie_note")}            itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_D2"]=='1') ? <MenuItemP menuItemId ='54' imgSource='images/SaveNotes.png'           libelle={t("consult_notes")}            itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_D3"]=='1') ? <MenuItemP menuItemId ='18' imgSource='images/PrintStudentReport.png'  libelle={t("bulletins_notes")}             itemSelected={showSideMenu}></MenuItemP> : null}
          {/*(currentAppContext.enableProfiles["SCOLARITE_D4"]=='1') ? <MenuItemP menuItemId ='19' imgSource='images/LookStudentReport.png'   libelle={t("consult_bulletin")}             itemSelected={showSideMenu}></MenuItemP> : null*/}
          {/*<MenuItemP imgSource='images/BilletSortie.png'  libelle='Admission en claase ' itemSelected={showSideMenu}></MenuItemP>*/}
        </MenuItemListP>
        :
        null
      }

      {(currentAppContext.enableProfiles["SCOLARITE_E"]=='1') ?
        <MenuItemListP minWtdhStyle={classes.size72Vw} libelle= {t("exams_officiels")} theme={selectedTheme}>
          {(currentAppContext.enableProfiles["SCOLARITE_E1"]=='1') ? <MenuItemP menuItemId ='20' imgSource='images/NewEvaluation.png'  libelle={t("new_exam")}             itemSelected={showSideMenu}></MenuItemP> : null}
          {(currentAppContext.enableProfiles["SCOLARITE_E2"]=='1') ? <MenuItemP menuItemId ='21' imgSource='images/SaveNotes.png'      libelle={t("saisi_resultats")}      itemSelected={showSideMenu}></MenuItemP>: null}
          {(currentAppContext.enableProfiles["SCOLARITE_E3"]=='1') ? <MenuItemP menuItemId ='22' imgSource='images/ListAdmis.png'      libelle={t("admis_exams")}          itemSelected={showSideMenu}></MenuItemP> : null}
          {/*<MenuItemP imgSource='images/BilletSortie.png'  libelle='Changement de classe' itemSelected={showSideMenu}></MenuItemP>
          <MenuItemP imgSource='images/BilletSortie.png'  libelle='Admission en claase ' itemSelected={showSideMenu}></MenuItemP>*/}
        </MenuItemListP>
        :
        null
      }
        
      </div>
                  
      <div id="side-menu" class="sidenav side-menu">
        <FormLayout formCode={curentMenuItemPId}>
          {curentMenuItemPId==1  && <ListeDesEleves formMode='ajout'/>             } 
          {curentMenuItemPId==2  && <ListeDesEleves formMode='liste'/>             }
          {curentMenuItemPId==3  && <ChangementClasse/>                            }                    
          {curentMenuItemPId==4  && <CarteScolaire formMode='generation'/>         }
          {curentMenuItemPId==5  && <ConseilClasse formMode='ajout'/>              } 
          {curentMenuItemPId==6  && <AdmissionClasseSup/>                          }
          {curentMenuItemPId==7  && <EmploiDeTemps formMode='ajout'/>              }
          {/*curentMenuItemPId==8 && <EmploiDeTemps formMode='consult'/>         */}
          {curentMenuItemPId==9  && <ProgramClasse/>                               } 
          {curentMenuItemPId==10 && <CahierDeTexte currentClasse={null} currentMatiere={null}/>      }
          {curentMenuItemPId==11 && <Appel formMode='appel'/>                     }
          {curentMenuItemPId==12 && <ConseilDiscipline formMode='ajout'/>         }
          {curentMenuItemPId==13 && <Studentprofile/>                             }
          {curentMenuItemPId==14 && <BilletEntree/>                               }
          {curentMenuItemPId==15 && <BilletSortie/>                               }
          {curentMenuItemPId==16 && <NewEvaluation/>                              }
          {curentMenuItemPId==17 && <SaveNotes/>                                  }
          {curentMenuItemPId==18 && <PrintStudentReport formMode='generation'/>   }
          {curentMenuItemPId==19 && <LookStudentReport/>                          }
          {curentMenuItemPId==20 && <NewOfficialExam/>                            }
          {curentMenuItemPId==21 && <SaveExamNotes/>                              }
          {curentMenuItemPId==22 && <ListAdmis/>                                  }
          {curentMenuItemPId==51 && <SuiviFicheProgress/>                         }
          {curentMenuItemPId==52 && <EmploiDeTemps formMode='consult'/>           }
          {curentMenuItemPId==53 && <Appel formMode='appel'/>                     }
          {curentMenuItemPId==53 && <SaveExamNotes/>                              }
        </FormLayout>     
      </div>
    </div>
  );
}

export default ScolaritePage;