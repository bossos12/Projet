import React from 'react';
import classes from "./Book.module.css";
import CustomButton from '../customButton/CustomButton';
import MenuItemList from '../layout/cs_layout/menuItemList/MenuItemList';
import FormPuce from '../formPuce/FormPuce'
import UiContext from '../../store/UiContext';
import { useContext, useState } from "react";
import {TAB_MODULES, TAB_CHAPITRE, TAB_LESSON, TO_RIGHT_SHEETS, TO_LEFT_SHEETS, LISTE_LECONS} from './CT_Module';
import {gotoLesson} from './CT_Module';
import { useTranslation } from "react-i18next";
import '../../translation/i18n';


function TableOfContents(props){

    const { t, i18n } = useTranslation();
    const currentUiContext = useContext(UiContext);
    //const currentAppContext = useContext(AppContext);
    const [curentMenuItemId,setMenuItemId]=useState(0);
    

    /*const [section1SelectedItem,setSection1SelectedItem]=useState(0);
    const [section2SelectedItem,setSection2SelectedItem]=useState(0);
    const [section3SelectedItem,setSection3SelectedItem]=useState(0);
    const [section4SelectedItem,setSection4SelectedItem]=useState(0);
    const [section5SelectedItem,setSection5SelectedItem]=useState(0);*/
    
    const selectedTheme = currentUiContext.theme;
   
    function getPuceByTheme()
    { // Choix du theme courant
        switch(selectedTheme){
            case 'Theme1': return 'puceN1.png' ;
            case 'Theme2': return 'puceN2.png' ;
            case 'Theme3': return 'puceN3.png' ;
            default: return 'puceN1.png' ;
        }
    }

    function getDetailSectionBlankTheme()
    { 
      return classes.MenuItemSectionDetails_BLANK
    }

    function getDetailSectionTheme()
    { // Choix du theme courant
      switch(selectedTheme){
        case 'Theme1': return classes.Theme1_MenuItemSectionDetails ;
        case 'Theme2': return classes.Theme2_MenuItemSectionDetails ;
        case 'Theme3': return classes.Theme3_MenuItemSectionDetails ;
        default: return classes.Theme1_MenuItemSectionDetails ;
      }
    }

    function getCurrentContaintTheme()
    { // Choix du theme courant
      switch(selectedTheme){
        case 'Theme1': return classes.Theme1_mainContentPosition ;
        case 'Theme2': return classes.Theme2_mainContentPosition ;
        case 'Theme3': return classes.Theme3_mainContentPosition ;
        default: return classes.Theme1_mainContentPosition ;
      }
    }
    
    return(     
        <div id={props.id} className={classes.preface}>
            <div className={classes.pageTitle}> {t("table_of_contentM")} </div>
            { (TAB_MODULES||[]).map((module) => {
                return (
                    <MenuItemList minWtdhStyle={classes.size27Vw}  libelle= {module.libelleModule} theme={selectedTheme} banStyle={{height:'18.7px'}} puceTextStyle={{fontSize:'0.8rem', display:'flex', alignItems:"center", paddingBottom:'0px'}}>
                        {(TAB_CHAPITRE[module.moduleId]||[]).map((chapitre) => {
                            return (
                                <div>
                                    <FormPuce menuItemId ='1' 
                                        isSimple={true} 
                                        noSelect={true} 
                                        imgSource={'images/' + getPuceByTheme()} 
                                        withCustomImage={true} 
                                        imageStyle={classes.PuceStyle}    
                                        libelle = {chapitre.libelleChapitre}   
                                        itemSelected={null}
                                        puceLabelStyle={{fontSize:'0.9rem !important'}}
                                    />
                                    {(TAB_LESSON[chapitre.chapitreId]||[]).map((lesson)=>{
                                        if(lesson.etat==1){
                                            return (
                                                <div style={{display:'flex', flexDirection:'row', marginLeft:'2vw', cursor:'pointer'}}>
                                                    <img src ='images/pending_trans.png' style={{width:'0.8vw', height:'0.8vw', alignSelf:'center', marginRight:'0.67vw'}} onClick={()=>gotoLesson(lesson.lessonId, props.id)}/>
                                                    <div style={{fontSize:'0.9vw', color:'#dc900b'}} onClick={()=>gotoLesson(lesson.lessonId, props.id)}>{lesson.libelleLesson}</div>
                                                </div>                                                
                                            );

                                        } else if(lesson.etat==2){
                                            return (
                                                <div style={{display:'flex', flexDirection:'row', marginLeft:'2vw', cursor:'pointer'}}>
                                                <img src ='images/check_trans.png' style={{width:'0.8vw', height:'0.8vw', marginRight:'0.67vw'}} onClick={()=>gotoLesson(lesson.lessonId, props.id)}/>
                                                <div style={{fontSize:'0.9vw',color:'rgb(167 164 164)'}} onClick={()=>gotoLesson(lesson.lessonId, props.id)}>{lesson.libelleLesson}</div>
                                            </div>      
                                            );

                                        } else {
                                            return (
                                                <li className={classes.liStyle} style={{fontSize:'0.9vw',  cursor:'pointer'}} onClick={()=>gotoLesson(lesson.lessonId, props.id)}>{lesson.libelleLesson}</li>  
                                            );

                                        }                                       
                                       
                                    })}  
                                                                           
                                </div> 
                                
                            );
                                
                        })}                      
                    </MenuItemList>
                );                
               
            })} 
                
        </div>
    );
}
export default TableOfContents;