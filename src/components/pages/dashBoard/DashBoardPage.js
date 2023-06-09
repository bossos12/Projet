import React from "react";
import { useTranslation } from "react-i18next";
import MenuItemListP from '../../layout/cs_layout/menuItemList/MenuItemListP';
import classes from './DashBoardPage.module.css';
import M_classes from './M_DashBoardPage.module.css';
import MenuItemP from '../../layout/cs_layout/menuItem/MenuItemP';
import M from 'materialize-css';
import {isMobile} from 'react-device-detect';

import { useState, useEffect, useContext } from "react";
import UiContext from '../../../store/UiContext';
import AppContext from "../../../store/AppContext";

import FormLayout from "../../layout/cs_layout/formLayout/FormLayout";
import CahierDeTexte from "../scolarite/subPages/CahierDeTexte";

import ProgramCoverNiveau from './subPages/ProgramCover/ProgramCoverNiveau';
import ProgramCoverClass  from './subPages/ProgramCover/ProgramCoverClass';
import ProgramCoverMatiere from './subPages/ProgramCover/ProgramCoverMatiere';

import Effectifs from './subPages/effectifs/Effectifs';
import Frais from './subPages/frais/Frais';
import Assiduite from './subPages/assiduite/Assiduite';
import Resultats from './subPages/resultats/Resultats';

import axiosInstance from '../../../axios';


function DashBoardPage() {
      
  const { t, i18n } = useTranslation();
  const currentUiContext = useContext(UiContext);
  const currentAppContext = useContext(AppContext);
  
  //Cette constante sera lu lors de la configuration de l'utilisateur.
  const selectedTheme = currentUiContext.theme;
 //const [curentMenuItemPId,setMenuItemPId]=useState(10);
 
  const [optNiveauPC, setOptNiveauPC] = useState([{value:0, label:"  Tous  "}]);
  const [optClassePC, setOptClassePC] = useState([{value:0, label:"  Toutes  "}]);
  const [optMatieresPC, setOptMatieresPC] = useState([{value:0, label:"  Toutes  "}]);

  const [optNiveauEFF, setOptNiveauEFF] = useState([{value:0, label:"  Tous  "}]);
  const [optClasseEFF, setOptClasseEFF] = useState([{value:0, label:"  Toutes  "}]);
  const [optMatieresEFF, setOptMatieresEFF] = useState([{value:0, label:"  Toutes  "}]);

  const [optNiveauFR, setOptNiveauFR] = useState([{value:0, label:"  Tous  "}]);
  const [optClasseFR, setOptClasseFR] = useState([{value:0, label:"  Toutes  "}]);
  const [optMatieresFR, setOptMatieresFR] = useState([{value:0, label:"  Toutes  "}]);

  const [optNiveauASS, setOptNiveauASS] = useState([{value:0, label:"  Tous  "}]);
  const [optClasseASS, setOptClasseASS] = useState([{value:0, label:"  Toutes  "}]);
  const [optMatieresASS, setOptMatieresASS] = useState([{value:0, label:"  Toutes  "}]);

  const [optNiveauRES, setOptNiveauRES] = useState([{value:0, label:"  Tous  "}]);
  const [optClasseRES, setOptClasseRES] = useState([{value:0, label:"  Toutes  "}]);
  const [optMatieresRES, setOptMatieresRES] = useState([{value:0, label:"  Toutes  "}]);


  const [prgramCoverSelectedLevel, setPrgramCoverSelectedLevel]   = useState({label:'Tous'  , id:0});
  const [prgramCoverSelectedClass, setPrgramCoverSelectedClass]   = useState({label:'Toutes', id:0});
  const [progCoverSelectedMatiere, setPrgramCoverSelectedMatiere] = useState({label:'Toutes', id:0});

  
  const [isInscritLevelChart, setIsInscritLevelChart] = useState(false);
  const [isInscritClassChart, setIsInscritClassChart] = useState(false);
  
  const [isFraisScolaireLevel, setIsFraisScolaireLevel] = useState(false);
  const [isFraisScolaireClass, setIsFraisScolaireClass] = useState(false);
 
  
  const [effectifLevel, setEffectifLevel]       = useState(0);
  const [effectifClass, setEffectifClass]       = useState(0);

  const [assiduiteLevel, setAssiduiteLevel]     = useState(1);
  const [assiduiteClass, setAssiduiteClass]     = useState(1);
  const [assiduiteMatiere, setAssiduiteMatiere] = useState(1);

  const [resultatLevel, setResultatLevel]       = useState(1);
  const [resultatClass, setResultatClass]       = useState(1);
  const [resultatMatiere, setResultatMatiere]   = useState(1);

  useEffect(()=> {
    var tabNiveaux  = [...getEtabNiveaux(currentAppContext.currentEtab)];
    var tabClasses  = [... getEtabClassesNiveau(currentAppContext.currentEtab, 0)];
    var tabMatieres = [... getEtabMatieresClasse(currentAppContext.currentEtab, 0)]
  


    console.log('tetete',tabClasses);
    //------- Niveau ---------
    setOptNiveauPC(tabNiveaux);
    setOptNiveauEFF(tabNiveaux);
    setOptNiveauFR(tabNiveaux);
    setOptNiveauASS(tabNiveaux);
    setOptNiveauRES(tabNiveaux);

    //------- Classes ---------
    setOptClassePC(tabClasses);
    setOptClasseEFF(tabClasses);
    setOptClasseFR(tabClasses);
    setOptClasseRES(tabClasses);

    //------- Classes ---------
    setOptMatieresPC(tabMatieres);
    setOptMatieresASS(tabMatieres);
    setOptMatieresRES(tabMatieres);

   
  },[]);


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

 function getSectionBgClr()
  {  // Choix du theme courant
     switch(selectedTheme){
          case 'Theme1': return classes.Theme1_sectionBg ;
          case 'Theme2': return classes.Theme2_sectionBg ;
          case 'Theme3': return classes.Theme3_sectionBg ;
          default: return classes.Theme1_sectionBg ;
      }
  }

  function getEtabNiveaux(sousEtabId){
    var tempTable=[{value: 0,      label: (i18n.language=='fr') ? ' Tous ' : ' All '  }]
    var sousEtabNiveau =  currentAppContext.infoNiveaux.filter((niveau)=>niveau.id_setab == sousEtabId)

    sousEtabNiveau.map((niveau)=>{
      tempTable.push({value:niveau.id_niveau, label:niveau.libelle});
    });

    console.log('oiiii', currentAppContext.infoClasses);     
    return(tempTable);
  }

  function getEtabClassesNiveau(sousEtabId, niveauId){
    var tempTable=[{value: 0,      label: (i18n.language=='fr') ? ' Toutes ' : ' All '  }]
    var tabClasses
     
    if(niveauId == 0) {
      tabClasses =  currentAppContext.infoClasses.filter((classe)=>classe.id_setab == sousEtabId)
      tabClasses.map((classe)=>{
      tempTable.push({value:classe.id_niveau, label:classe.libelle});
      });
    } else {
      tabClasses =  currentAppContext.infoClasses.filter((classe)=>classe.id_setab == sousEtabId && classe.id_niveau == niveauId )
      tabClasses.map((classe)=>{
        tempTable.push({value:classe.id_niveau, label:classe.libelle});
      });   

    }
    return(tempTable);
  }

  function getEtabMatieresClasse(sousEtabId, classeId){
    var tempTable=[{value: 0,      label: (i18n.language=='fr') ? ' Toutes ' : ' All '  }]
    var tabMatieres

    if(classeId==0){
      tabMatieres = currentAppContext.infoMatieres.filter((matiere)=>matiere.id_setab==sousEtabId)
      tabMatieres.map((matiere)=>{
        tempTable.push({value:matiere.id_matiere, label:matiere.libelle});
      })
      

    } else {
      tabMatieres = currentAppContext.infoCours.filter((cours)=>cours.id_setab==sousEtabId && cours.id_classe == classeId)
      tabMatieres.map((matiere)=>{
        tempTable.push({value:matiere.id_matiere, label:matiere.libelle_matiere});
      })

    }   
    console.log("hshsh",tempTable, currentAppContext.infoCours);
    return(tempTable);

  }

 

 const tabMatieres=[
  {value: '0',      label:'Toutes'           },
  {value: '1',      label:'Anglais'          },
  {value: '2',      label:'Allemand'         },
  {value: '3',      label:'Maths'            },
  {value: '4',      label:'PCT'              },
  {value: '5',      label:'SVT'              },
  {value: '6',      label:'Histoire'         },
  {value: '7',      label:'Geographie'       }
];

  

/****************************************** Les Handlers ****************************************/
//---------------- Programme Completion -----------------//
const progCompletionLevelHandler=(e)=>{  
  var curentLevel = e.target.value;  
  var cur_index = optNiveauPC.findIndex((index)=>index.value == curentLevel);
  var libelleLevel = optNiveauPC[cur_index].label;
  
  var level ={};
  level.id = curentLevel;
  level.label = libelleLevel;

  
  console.log(level)
  //-------- Charger les classes a partir du niveau --------- 
  var tabClasses = getEtabClassesNiveau(currentAppContext.currentEtab, level.id);
  setOptClassePC(tabClasses);
  setPrgramCoverSelectedLevel(level);
}

const progCompletionClassHandler=(e)=>{  
  var curentClass = e.target.value;  
  var cur_index = optClassePC.findIndex((index)=>index.value == curentClass);
  var libelleClasse = optClassePC[cur_index].label;

  var classe ={};
  classe.id = curentClass;
  classe.label = libelleClasse;

  //-------- Charger les matierers a partir de la classe
  var tabMatieres = getEtabMatieresClasse(currentAppContext.currentEtab,classe.id)
  setOptMatieresPC(tabMatieres);
  setPrgramCoverSelectedClass(classe);
  
}

const progCompletionMatiereHandler=(e)=>{
  var curentMatiere = e.target.value;
  var cur_index = optMatieresPC.findIndex((index)=>index.value == curentMatiere);
  var libelleMatiere = optMatieresPC[cur_index].label; 

  
  //setPrgramCoverSelectedMatiere(matiere); 
  console.log(optMatieresPC);
}


//---------------- Effectifs -----------------//

const effectifNiveauHandler=(e)=>{
  var curentLevel = e.target.value;  
  var cur_index = optNiveauEFF.findIndex((index)=>index.value == curentLevel);
  var libelleLevel = optNiveauEFF[cur_index].label;
  
  var level ={};
  level.id = curentLevel;
  level.label = libelleLevel;
  
  console.log(level)
  //-------- Charger les classes a partir du niveau --------- 
  var tabClasses = getEtabClassesNiveau(currentAppContext.currentEtab, level.id);
  setOptClasseEFF(tabClasses);
  setEffectifLevel(level); 
}

const effectifClasseHandler=(e)=>{
  
}

//---------------- Frais -----------------//

const fraisNiveauHandler=(e)=>{
  var curentLevel = e.target.value;  
  var cur_index = optNiveauFR.findIndex((index)=>index.value == curentLevel);
  var libelleLevel = optNiveauFR[cur_index].label;
  
  var level ={};
  level.id = curentLevel;
  level.label = libelleLevel;

  
  console.log(level)
  //-------- Charger les classes a partir du niveau --------- 
  var tabClasses = getEtabClassesNiveau(currentAppContext.currentEtab, level.id);
  setOptClasseFR(tabClasses);
  //set (level);  
}

const fraisClasseHandler=(e)=>{
 
}

//---------------- Assiduite -----------------//

const assiduiteNiveauHandler=(e)=>{
  var curentLevel = e.target.value;  
  var cur_index = optNiveauASS.findIndex((index)=>index.value == curentLevel);
  var libelleLevel = optNiveauASS[cur_index].label;
  
  var level ={};
  level.id = curentLevel;
  level.label = libelleLevel;

  
  console.log(level)
  //-------- Charger les classes a partir du niveau --------- 
  var tabClasses = getEtabClassesNiveau(currentAppContext.currentEtab, level.id);
  setOptClasseASS(tabClasses);
  setAssiduiteLevel(level);
 
  
}

const assiduiteClasseHandler=(e)=>{
  
}

const assiduiteMatiereHandler=(e)=>{
  
}

//---------------- Resultats -----------------//

const resultatsNiveauHandler=(e)=>{
  var curentLevel = e.target.value;  
  var cur_index = optNiveauEFF.findIndex((index)=>index.value == curentLevel);
  var libelleLevel = optNiveauEFF[cur_index].label;
  
  var level ={};
  level.id = curentLevel;
  level.label = libelleLevel;
  
  console.log(level)
  //-------- Charger les classes a partir du niveau --------- 
  var tabClasses = getEtabClassesNiveau(currentAppContext.currentEtab, level.id);
  setOptClasseRES(tabClasses);
  //setEffectifLevel(level); 
  
}

const resultatsClasseHandler=(e)=>{
  
}

const resultatsMatiereHandler=(e)=>{
 
}





/****************************************** fin des Handlers ************************************/
  
  
  return ( 
    <div className={classes.viewContent}>
      <div className= {getCurrentContaintTheme()}>
        <div className={classes.dashBoardRow}>
            
          <div className={classes.sectionTitle +' '+ getSectionBgClr()}>
            {t('taux_couverture')}
          </div>
            
            
          <div className={classes.column25}>
            <div className={classes.selectZone} style={{marginLeft:'-5.7vw'}}>
              <div className={classes.labelTitle}>{t('level')} : </div>
              <select id='selectNiveau1' onChange={progCompletionLevelHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                  {(optNiveauPC||[]).map((option)=> {
                      return(
                          <option  value={option.value}>{option.label}</option>
                      );
                  })}
              </select> 
            </div>
            <div style={{paddingTop:'13vh', display: 'flex', width:'13vw', height:'0vw', justifyContent:'center', alignItems:'center'}}>
              <ProgramCoverNiveau selectedNiveau={prgramCoverSelectedLevel.id}/>
            </div>
          </div>
            
            
          <div className={classes.column26}>
            <div className={classes.selectZone} style={{marginLeft:'2vh'}}>
              <div className={classes.labelTitle}> {t('class')}   : </div>
              <select id='selectClasse1' onChange={progCompletionClassHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                  {(optClassePC||[]).map((option)=> {
                      return(
                          <option  value={option.value}>{option.label}</option>
                      );
                  })}
              </select> 

            </div>
            <div style={{  width:'20vw', height:'23vw', justifyContent:'center'}}>
              <ProgramCoverClass selectedClasse={prgramCoverSelectedClass.id}/>
            </div>
            
          </div>

          <div>
            <div className={classes.selectZone} style={{marginLeft:'2vh'}}>
                <div className={classes.labelTitle}> {t('matiere')}   : </div>
                <select id='selectMatiere1' onChange={progCompletionMatiereHandler} className={classes.comboBoxStyle} style={{width:'10.3vw', marginBottom:1}}>
                    {(optMatieresPC||[]).map((option)=> {
                        return(
                            <option  value={option.value}>{option.label}</option>
                        );
                    })}
                </select> 

            </div>

            <div style={{  width:'20vw', height:'23vw', justifyContent:'center'}}>
              <ProgramCoverMatiere selectedClasse={prgramCoverSelectedClass} selectedMatiere={progCoverSelectedMatiere} />
            </div>          
  
          </div>
            
            
          

        </div>

        <div className={classes.dashBoardRow}>
          <div className={classes.sectionTitle +' '+ getSectionBgClr()}>
            {t('effectifs')}
          </div>
          
          <div className={classes.column30}>
            <div className={classes.selectZone} style={{marginLeft:'-5.7vw'}}>
              <div className={classes.labelTitle}> {t('level')}   : </div>
              <select id='selectNiveau2' onChange={effectifNiveauHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                {(optNiveauEFF||[]).map((option)=> {
                    return(
                      <option  value={option.value}>{option.label}</option>
                    );
                })}
              </select>
              <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingTop:'0.7vh' }}>
                <label style={{color:'grey', marginLeft:'2vw', marginRight:3}}>{t('effectifs_total')} </label>
                <input type='radio' checked={!isInscritLevelChart}  value={'enreg'} name='effectifsNiveau' onClick={()=> { isInscritLevelChart ? setIsInscritLevelChart(false) :setIsInscritLevelChart(true)}}/>
                <label style={{color:'grey', marginLeft:'2vw', marginRight:3}}> {t('effectifs_inscrit')}</label>
                <input type='radio' checked={isInscritLevelChart}  value={'inscrits'} name='effectifsNiveau' onClick={()=> { isInscritLevelChart ? setIsInscritLevelChart(false) :setIsInscritLevelChart(true)}}/>
              </div> 

            </div>
          
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <div style={{  width:'20vw', height:'23vw', justifyContent:'center'}}>
                <Effectifs selectedClass='' selectedNiveau={effectifLevel} isInscrits={isInscritLevelChart}/>
              </div>             
            </div>
          </div>

  
          <div style={{display:'flex', flexDirection:'column'}}>
            <div className={classes.selectZone} style={{marginLeft:'2vw'}}>
              <div className={classes.labelTitle}> {t('class')}   : </div>
              <select id='selectclass2' onChange={effectifClasseHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                {(optClasseEFF||[]).map((option)=> {
                    return(
                      <option  value={option.value}>{option.label}</option>
                    );
                })}
              </select>
              <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingTop:'0.7vh' }}>
                <label style={{color:'grey', marginLeft:'2vw', marginRight:3}}>{t('effectifs_total')} </label>
                <input type='radio' checked={!isInscritClassChart}  value={'enreg'} name='effectifsClasse' onClick={()=> { isInscritClassChart ? setIsInscritClassChart(false) :setIsInscritClassChart(true)}}/>
                <label style={{color:'grey', marginLeft:'2vw', marginRight:3}}> {t('effectifs_inscrit')} </label>
                <input type='radio' checked={isInscritClassChart}  value={'inscrits'} name='effectifsClasse' onClick={()=> { isInscritClassChart ? setIsInscritClassChart(false) :setIsInscritClassChart(true)}}/>
              </div> 
            </div>    
            
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <div style={{  width:'20vw', height:'23vw', justifyContent:'center'}}>
                <Effectifs selectedNiveau='' selectedClass={effectifClass} isInscrits={isInscritClassChart}/>
              </div>             
            </div> 
          </div>                     
          
        </div>

        <div className={classes.dashBoardRow}>
          <div className={classes.sectionTitle +' '+ getSectionBgClr()}>
            {t('frais')}
          </div>
            
          <div className={classes.column30}>
            <div className={classes.selectZone} style={{marginLeft:'-5.7vw'}}>
              <div className={classes.labelTitle}> {t('level')}   : </div>
              <select id='selectNiveau3' onChange={fraisNiveauHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                {(optNiveauFR||[]).map((option)=> {
                    return(
                      <option  value={option.value}>{option.label}</option>
                    );
                })}
              </select>
              <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingTop:'0.7vh' }}>
                <label style={{color:'grey', marginLeft:'2vw', marginRight:1}}>{t('frais_scolariteP')} </label>
                <input type='radio' checked={!isFraisScolaireLevel}  value={'inscrits'} name='fraisNiveau' onClick={()=> { isFraisScolaireLevel ? setIsFraisScolaireLevel(false) :setIsFraisScolaireLevel(true)}}/>
                <label style={{color:'grey', marginLeft:'2vw', marginRight:1}}> {t('other_fees')} </label>
                <input type='radio' checked={isFraisScolaireLevel}  value={'enreg'} name='fraisNiveau' onClick={()=> { isFraisScolaireLevel ? setIsFraisScolaireLevel(false) :setIsFraisScolaireLevel(true)}}/>
              </div> 

            </div>
          
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <div style={{  width:'20vw', height:'23vw', justifyContent:'center'}}>
                <Frais selectedClass='' selectedNiveau={effectifLevel} isSchoolFees={!isFraisScolaireLevel}/>
              </div>             
            </div>
          </div>

          <div style={{display:'flex', flexDirection:'column'}}>
            <div className={classes.selectZone} style={{marginLeft:'2vw'}}>
              <div className={classes.labelTitle}> {t('class')}   : </div>
              <select id='selectclass3' onChange={fraisClasseHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                {(optClasseFR||[]).map((option)=> {
                    return(
                      <option  value={option.value}>{option.label}</option>
                    );
                })}
              </select>

              <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingTop:'0.7vh' }}>
                <label style={{color:'grey', marginLeft:'2vw', marginRight:1}}> {t('frais_scolariteP')} </label>
                <input type='radio' checked={!isFraisScolaireClass}  value={'enreg'} name='fraisClasse' onClick={()=> { isFraisScolaireClass ? setIsFraisScolaireClass(false) :setIsFraisScolaireClass(true)}}/>
                <label style={{color:'grey', marginLeft:'2vw', marginRight:1}}> {t('other_fees')}  </label>
                <input type='radio' checked={isFraisScolaireClass}  value={'inscrits'} name='fraisClasse' onClick={()=> { isFraisScolaireClass ? setIsFraisScolaireClass(false) :setIsFraisScolaireClass(true)}}/>
              </div> 
            </div>    
            
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <div style={{  width:'20vw', height:'23vw', justifyContent:'center'}}>
                <Frais selectedNiveau='' selectedClass={effectifClass} isSchoolFees={!isFraisScolaireClass}/>
              </div>             
            </div> 
          </div>

  
          

        </div>

        <div className={classes.dashBoardRow}>
          <div className={classes.sectionTitle +' '+ getSectionBgClr()}>
            {t('assiduite')}
          </div>
          
            
          <div className={classes.column25}>
            <div className={classes.selectZone} style={{marginLeft:'-5.7vw'}}>
              <div className={classes.labelTitle}> {t('level')}   : </div>
              <select id='selectNiveau4' onChange={assiduiteNiveauHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                  {(optNiveauASS||[]).map((option)=> {
                      return(
                          <option  value={option.value}>{option.label}</option>
                      );
                  })}
              </select>

              <div style={{display:'flex', flexDirection:'column', justifyContent:"center", alignItems:'flex-end', paddingTop:'0.7vh', width:'12vw'}}>
                <div style={{display:'flex', flexDirection:'row'}}>
                  <input type='radio' checked={assiduiteLevel==1}  value={'enreg'} name='AssiduiteLevel' onClick={()=> {setAssiduiteLevel(1)}}/>
                  <label style={{color:'grey', marginLeft:'0vw', marginRight:1}}> Absences </label>
                </div>

                <div style={{display:'flex', flexDirection:'row'}}>
                  <input type='radio' checked={assiduiteLevel==2}  value={'inscrits'} name='AssiduiteLevel' onClick={()=> {setAssiduiteLevel(2)}}/>
                  <label style={{color:'grey', marginLeft:'0.13vw', marginRight:1}}> Consigne </label>
                </div>

                <div style={{display:'flex', flexDirection:'row'}}>
                  <input type='radio' checked={assiduiteLevel==3}  value={'inscrits'} name='AssiduiteLevel' onClick={()=> {setAssiduiteLevel(3)}}/>
                  <label style={{color:'grey', marginLeft:'0.1vw', marginRight:1}}> Exclusion </label>
                </div>
              </div>  

            </div>

            <div style={{paddingTop:'8vh', display: 'flex', width:'15vw', height:'0vw', justifyContent:'center', alignItems:'center'}}>
              <Assiduite selectedNiveau={prgramCoverSelectedLevel.id} selectedClass='' selectedMatiere='' codeAssiduite={assiduiteLevel}/>
            </div>

          </div>
            
            
          <div className={classes.column26}>
            <div className={classes.selectZone} style={{marginLeft:'2vh'}}>
              <div className={classes.labelTitle}> {t('class')}   : </div>
              <select id='selectClasse4' onChange={assiduiteClasseHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                  {(optClasseASS||[]).map((option)=> {
                      return(
                          <option  value={option.value}>{option.label}</option>
                      );
                  })}
              </select> 

              <div style={{display:'flex', flexDirection:'column', justifyContent:"center", alignItems:'flex-end', paddingTop:'0.7vh', width:'12vw'}}>
                <div style={{display:'flex', flexDirection:'row'}}>
                  <input type='radio' checked={assiduiteClass==1}  value={'enreg'} name='AssiduiteClasse'   onClick={()=> {setAssiduiteClass(1)}}/>
                  <label style={{color:'grey', marginLeft:'0vw', marginRight:1}}> Absences </label>
                </div>

                <div style={{display:'flex', flexDirection:'row'}}>
                  <input type='radio' checked={assiduiteClass==2}  value={'inscrits'} name='AssiduiteClasse' onClick={()=> {setAssiduiteClass(2)}}/>
                  <label style={{color:'grey', marginLeft:'0.13vw', marginRight:1}}> Consigne </label>
                </div>

                <div style={{display:'flex', flexDirection:'row'}}>
                  <input type='radio' checked={assiduiteClass==3}  value={'inscrits'} name='AssiduiteClasse' onClick={()=> {setAssiduiteClass(3)}}/>
                  <label style={{color:'grey', marginLeft:'0.1vw', marginRight:1}}> Exclusion </label>
                </div>
              </div> 

            </div>
            <div style={{paddingTop:'8vh', display: 'flex', width:'15vw', height:'0vw', justifyContent:'center', alignItems:'center'}}>
              <Assiduite selectedNiveau='' selectedClass={prgramCoverSelectedLevel.id} selectedMatiere='' codeAssiduite={assiduiteClass}/>
            </div>
            
          </div>

          <div>
            <div className={classes.selectZone} style={{marginLeft:'2vh'}}>
              <div className={classes.labelTitle}> {t('matiere')}: </div>
              <select id='selectMatiere4' onChange={assiduiteMatiereHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                  {(optMatieresASS||[]).map((option)=> {
                      return(
                          <option  value={option.value}>{option.label}</option>
                      );
                  })}
              </select> 

              <div style={{display:'flex', flexDirection:'column', justifyContent:"center", alignItems:'flex-end', paddingTop:'0.7vh', width:'12vw'}}>
                <div style={{display:'flex', flexDirection:'row'}}>
                  <input type='radio' checked={assiduiteMatiere==1}  value={'enreg'} name='AssiduiteMatiere'   onClick={()=> {setAssiduiteMatiere(1)}}/>
                  <label style={{color:'grey', marginLeft:'0vw', marginRight:1}}> Absences </label>
                </div>

                <div style={{display:'flex', flexDirection:'row'}}>
                  <input type='radio' checked={assiduiteMatiere==2}  value={'inscrits'} name='AssiduiteMatiere' onClick={()=> {setAssiduiteMatiere(2)}}/>
                  <label style={{color:'grey', marginLeft:'0.13vw', marginRight:1}}> Consigne </label>
                </div>

                <div style={{display:'flex', flexDirection:'row'}}>
                  <input type='radio' checked={assiduiteMatiere==3} value={'inscrits'} name='AssiduiteMatiere' onClick={()=> {setAssiduiteMatiere(3)}}/>
                  <label style={{color:'grey', marginLeft:'0.1vw', marginRight:1}}> Exclusion </label>
                </div>
              </div>              

            </div>

            <div style={{paddingTop:'8vh', display: 'flex', width:'15vw', height:'0vw', justifyContent:'center', alignItems:'center'}}>
              <Assiduite selectedNiveau='' selectedClass='' selectedMatiere={prgramCoverSelectedLevel.id} codeAssiduite={assiduiteMatiere}/>
            </div>
  
          </div> 

        </div>

        <div className={classes.dashBoardRow}>
        <div className={classes.sectionTitle +' '+ getSectionBgClr()}>
            {t('resultats_scolaires')}
          </div>
          
            
          <div className={classes.column25}>
            <div className={classes.selectZone} style={{marginLeft:'-5.7vw'}}>
              <div className={classes.labelTitle}> {t('level')}   : </div>
              <select id='selectNiveau5' onChange={resultatsNiveauHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                {(optNiveauRES||[]).map((option)=> {
                    return(
                        <option  value={option.value}>{option.label}</option>
                    );
                })}
              </select> 
              <div style={{display:'flex', flexDirection:'column', justifyContent:"center", alignItems:'flex-end', paddingTop:'0.7vh', width:'12vw'}}>
                <div style={{display:'flex', flexDirection:'row', width:'8.7vw'}}>
                  <input type='radio' checked={resultatLevel==1}  value={'enreg'} name='resultatLevel'   onClick={()=> {setResultatLevel(1)}}/>
                  <label style={{color:'grey', marginLeft:'0.1vw', marginRight:1}}> {t('resultats_scolaires')} </label>
                </div>

                <div style={{display:'flex', flexDirection:'row', width:'8.7vw'}}>
                  <input type='radio' checked={resultatLevel==2}  value={'inscrits'} name='resultatLevel' onClick={()=> {setResultatLevel(2)}}/>
                  <label style={{color:'grey', marginLeft:'0.13vw', marginRight:1}}> {t('exams_officiels')}  </label>
                </div>

              </div> 

            </div>

            <div style={{paddingTop:'8vh', display: 'flex', width:'15vw', height:'0vw', justifyContent:'center', alignItems:'center'}}>
              <Resultats selectedNiveau={prgramCoverSelectedLevel.id} selectedClass='' selectedMatiere='' codeResultat={resultatLevel}/>
            </div>
            
          </div>
            
            
          <div className={classes.column26}>
            <div className={classes.selectZone} style={{marginLeft:'2vh'}}>
              <div className={classes.labelTitle}> {t('class')}   : </div>
              <select id='selectClasse5' onChange={resultatsClasseHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                  {(optClasseRES||[]).map((option)=> {
                      return(
                          <option  value={option.value}>{option.label}</option>
                      );
                  })}
              </select> 

              <div style={{display:'flex', flexDirection:'column', justifyContent:"center", alignItems:'flex-end', paddingTop:'0.7vh', width:'12vw'}}>
                <div style={{display:'flex', flexDirection:'row', width:'8.7vw'}}>
                  <input type='radio' checked={resultatClass==1}  value={'enreg'} name='resultatClass'   onClick={()=> {setResultatClass(1)}}/>
                  <label style={{color:'grey', marginLeft:'0.1vw', marginRight:1}}> {t('resultats_scolaires')} </label>
                </div>

                <div style={{display:'flex', flexDirection:'row', width:'8.7vw'}}>
                  <input type='radio' checked={resultatClass==2}  value={'inscrits'} name='resultatClass' onClick={()=> {setResultatClass(2)}}/>
                  <label style={{color:'grey', marginLeft:'0.13vw', marginRight:1}}> {t('exams_officiels')} </label>
                </div>

              </div> 

            </div>

            <div style={{paddingTop:'8vh', display: 'flex', width:'15vw', height:'0vw', justifyContent:'center', alignItems:'center'}}>
              <Resultats selectedNiveau='' selectedClass={prgramCoverSelectedLevel.id} selectedMatiere='' codeResultat={resultatClass}/>
            </div>
            
          </div>

          <div>
            <div className={classes.selectZone} style={{marginLeft:'2vh'}}>
              <div className={classes.labelTitle}> {t('matiere')}: </div>
              <select id='selectMatiere5' onChange={resultatsMatiereHandler} className={classes.comboBoxStyle} style={{width:'7.3vw', marginBottom:1}}>
                  {(optMatieresRES||[]).map((option)=> {
                      return(
                          <option  value={option.value}>{option.label}</option>
                      );
                  })}
              </select> 
              <div style={{display:'flex', flexDirection:'column', justifyContent:"center", alignItems:'flex-end', paddingTop:'0.7vh', width:'12vw'}}>
                <div style={{display:'flex', flexDirection:'row', width:'8.7vw'}}>
                  <input type='radio' checked={resultatMatiere==1}  value={'enreg'} name='resultatMatiere'   onClick={()=> {setResultatMatiere(1)}}/>
                  <label style={{color:'grey', marginLeft:'0.1vw', marginRight:1}}> {t('resultats_scolaires')} </label>
                </div>

              </div> 
            </div>
            <div style={{paddingTop:'8vh', display: 'flex', width:'15vw', height:'0vw', justifyContent:'center', alignItems:'center'}}>
              <Resultats selectedNiveau='' selectedClass='' selectedMatiere={prgramCoverSelectedLevel.id} codeResultat={1}/>
            </div>  
          </div>

        </div>

        
        
      </div>

      <div id="side-menu" class="sidenav side-menu">
        <FormLayout formCode={'10'}>
          { <CahierDeTexte currentClasse={prgramCoverSelectedClass} currentMatiere={progCoverSelectedMatiere}/>  }
        </FormLayout>     
      </div>
    </div>
  );
} 
export default DashBoardPage;