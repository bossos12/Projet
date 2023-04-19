import React from 'react';
import classes from "./Book.module.css";
import CustomButton from '../customButton/CustomButton';
import UiContext from '../../store/UiContext';
import {FormControl, FormControlLabel, RadioGroup, Radio} from '@mui/material';
import AddContent from './AddContent'
import { useContext, useState } from "react";
import {LISTE_LECONS} from './CT_Module';
import {gotoPreface, getNextHandler, getPreviousHandler} from './CT_Module';
import {isMobile} from 'react-device-detect';
import { useTranslation } from "react-i18next";
import '../../translation/i18n';
import BackDrop from '../backDrop/BackDrop';
import AddLessonNote from './modals/AddLessonNote';

function Sheet(props){
    const currentUiContext = useContext(UiContext);
    const { t, i18n } = useTranslation();

    const [isValid, setIsValid] = useState(false);
    const [bookOpen, setBookOpen] = useState(false);
    const [devoirOpen, setDevoirOpen] = useState(1); //0->Ferme, 1->Devoir ouvert, 2-> Resumer ouvert
    const [modalOpen, setModalOpen] = useState(false);
    //const [modalResumeOpen, setModalResumeOpen] = useState(false);
    const [devoirTab, setDevoirTab]= useState(props.contenu.tabDevoirs);
    const [resumeTab, setResumeTab]= useState(props.contenu.tabResumes);

    const [resumeOpen, setResumeOpen] = useState(false);
    const selectedTheme = currentUiContext.theme;

    function getButtonStyle()
    { // Choix du theme courant
      switch(selectedTheme){
        case 'Theme1': return classes.Theme1_Btnstyle ;
        case 'Theme2': return classes.Theme2_Btnstyle ;
        case 'Theme3': return classes.Theme3_Btnstyle ;
        default: return classes.Theme1_Btnstyle ;
      }
    }

    function getSmallButtonStyle()
    { // Choix du theme courant
      switch(selectedTheme){
        case 'Theme1': return classes.Theme1_BtnstyleSmall ;
        case 'Theme2': return classes.Theme2_BtnstyleSmall ;
        case 'Theme3': return classes.Theme3_BtnstyleSmall ;
        default: return classes.Theme1_BtnstyleSmall ;
      }
    }

    function getChapitreTextColor()
    { // Choix du theme courant
      switch(selectedTheme){
        case 'Theme1': return 'rgb(47 87 180)' ;
        case 'Theme2': return 'rgb(29 95 2)' ;
        case 'Theme3': return '#5d5a5a' ;
        default: return 'rgb(47 87 180)' ;
      }
    }

    function getLessonTextColor()
    { // Choix du theme courant
      switch(selectedTheme){
        case 'Theme1': return 'rgb(115 149 194)' ;
        case 'Theme2': return 'rgb(82 146 58)' ;
        case 'Theme3': return '#aca4a4' ;
        default: return 'rgb(115 149 194)' ;
      }
    }


    function attachFileHandler(){
       
    }

    function addDevoir(devoir){
        if(devoir.length >0){
            devoirTab.push({
                libelle :devoir,
                date : new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear()
            });
            setModalOpen(false);      
            currentUiContext.setBookInActivity(false);      
        }
    }

    function addResumer(resumer){
        if(resumer.length >0){
            resumeTab.push({
                libelle :resumer,
                date : new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear()
            });
            setModalOpen(false);  
            currentUiContext.setBookInActivity(false);     
        }

    }
   
        
    return(        
        <div id={props.id} className={classes.page}>
            <div className={classes.dateZone}>
                <div className={classes.inputRow}>
                    <div className={classes.inputRowLabelSmall} style={{marginRight:'-1vw', fontWeight:'700'}}>
                        {t("date")} :                
                    </div>
                        
                    <div> 
                        <input id="date" type="text"  className={classes.inputRowControl} defaultValue={props.contenu.date} style={{fontSize:'0.85rem', height:'1.3rem', width:'5.3vw', borderBottom:'1px dotted rgb(195 189 189)'}}/>
                    </div>
                </div>
            </div>

            <div className={classes.lessonTitleZone}>
                <div className={classes.inputRow}>
                    <div  style={{width:'5vw', fontSize:'0.9rem', fontWeight:'700', color:'black'}}>
                        {t("chapter")} :                
                    </div>
                        
                    <div> 
                        <input id="chapitre" type="text"  className={classes.inputRowControl} defaultValue={props.contenu.libelleChapitre} style={{fontSize:'0.9rem', fontWeight:'700', height:'1rem', width:'22.3vw', color:'rgb(136 138 140)', borderBottom:'1px dotted rgb(195 189 189)'}} />
                    </div>
                </div>

                <div className={classes.inputRow}>
                    <div style={{width:'5vw', fontSize:'0.9rem', fontWeight:'700', color:'black'}}>
                        {t("lesson_title")}:                
                    </div>
                        
                    <div> 
                        <input id="lecon" type="text"  className={classes.inputRowControl} defaultValue={props.contenu.libelleLesson} style={{fontSize:'0.89rem', height:'1rem', width:'22.3vw', fontWeight:'700', borderBottom:'1px dotted rgb(195 189 189)', color:'rgb(136 138 140)'}}/>
                    </div>
                </div>
                
            </div>

            <div className={classes.inputRow} style={{marginBottom:'2.3vh', marginTop:'1.3vh'}}>
                
                <div className={classes.inputRow}>
                        <input type='checkbox'  checked={devoirOpen==1} name='bookDetails'  style={{width:'0.77vw'}}  onClick={()=>{(devoirOpen!=1)? setDevoirOpen(1) : setDevoirOpen(2);}}/>
                        <div  style={{marginLeft:'0.3vw', fontSize:'0.83rem', fontWeight:'800'}}>
                            {t("given_homework")}             
                        </div>
                </div>

                <div className={classes.inputRow}>
                    <input type='checkbox' checked={devoirOpen==2} name='bookDetails'  style={{width:'0.77vw'}}  onClick={()=>{(devoirOpen!=2) ? setDevoirOpen(2) : setDevoirOpen(1);}} />
                    <div style={{marginLeft:'0.3vw', fontSize:'0.83rem', fontWeight:'800'}}>
                        {t("lesson_summary")}               
                    </div>
                </div>
                                            
            </div>
         
            <div className={classes.inputRowSimple +' '+classes.BoldMedium +' '+classes.paddingHorizontal}>
                <div className={classes.inputRowLeft+' '+classes.textStyleP}>
                    {(devoirOpen==2) ? t("summary_list") : (devoirOpen==1) ? t("homework_list"):null}
                </div>

                <div className={classes.inputRowRight}>
                    <CustomButton
                        btnText= {t("add")}  
                        buttonStyle={classes.btnAdd}
                        btnTextStyle = {classes.btnTextStyle}
                        hasIconImg= {false}
                        btnClickHandler={()=>{currentUiContext.setBookInActivity(true); setModalOpen(true); console.log('activite',currentUiContext.bookInActivity)}}
                    /> 
                </div>           
            </div>
            
            <div style={{width:'93%', height:'45vh', borderStyle:'solid', borderWidth:"2px", borderColor:'gray', borderRadius:'7px', alignSelf:'center', padding:7, marginBottom:'-2vh'}}>
                {(modalOpen) && <BackDrop/>}
                {(modalOpen) && <AddLessonNote isDevoir ={(devoirOpen==1)} cancelHandler={()=>{setModalOpen(false); currentUiContext.setBookInActivity(false);}} addNote={(devoirOpen==1) ? addDevoir:addResumer}/>}

              
                <div  style={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'center', width:'97%', height:'93%', overflowX:'scroll', overflowY:'scroll', backgroundColor:'#d4deee'}}> 
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', width:'100%', height:'10%', backgroundColor:"gray"}}>
                        <div style={{width:'80%'}}>
                            <label className={classes.textStyle+' '+classes.BoldMediumP}>Titre</label>
                        </div>

                        <div style={{width:'20%'}}>
                            <label className={classes.textStyle+' '+classes.BoldMediumP}>Date</label>
                        </div>                            
                    </div>
                                        
                    {(devoirOpen==1) ? 
                        devoirTab.map((devoir)=>{
                            return(  
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:'97%'}}>
                                    <div style={{width:'80%', borderBottom:"1px solid black"}}>
                                        <div className={classes.textStyleP}> {devoir.libelle}</div>
                                    </div>
                                    <div style={{width:'20%', borderBottom:"1px solid black"}}>
                                        <div className={classes.textStyleP}> {devoir.date}</div>
                                    </div>                                        
                                </div>                     
                            );
                        })
                        :
                        (devoirOpen==2) ?
                            resumeTab.map((resume)=>{
                                return(  
                                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:'97%'}}>
                                        <div style={{width:'80%', borderBottom:"1px solid black"}}>
                                            <div className={classes.textStyleP}> {resume.libelle}</div>
                                        </div>
                                        <div style={{width:'20%',borderBottom:"1px solid black"}}>
                                            <div className={classes.textStyleP}> {resume.date}</div>
                                        </div>                                        
                                    </div>                     
                                );
                            }) 
                        :
                        null                        
                                    
                    }
                    
                </div>
                
            </div>
           
            <div className={classes.attachFileZone} >
                <CustomButton
                    btnText={t("join_file")} 
                    buttonStyle={getSmallButtonStyle()}
                    btnTextStyle = {classes.btnTextStyle}
                    hasIconImg= {true}
                    imgSrc='images/trombone2.png'
                    imgStyle = {classes.imgStyleP}
                    btnClickHandler={attachFileHandler}
                    style={{paddingRight:'3px',width:'7vw'}}
                    //disable={(isValid==true)}
                />


               {/*<CustomButton
                    btnText={t("save")}  
                    buttonStyle={getButtonStyle()}
                    btnTextStyle = {classes.btnTextStyle}
                    btnClickHandler={()=>getPreviousHandler(props.id,props.contenu)}
                />*/}

                <CustomButton
                    btnText={t("save")} 
                    buttonStyle={getSmallButtonStyle()}
                    style={{width:'7vw'}}
                    btnTextStyle = {classes.btnSmallTextStyle}
                    btnClickHandler={()=>getPreviousHandler(props.id,props.contenu)}
                /> 


                <CustomButton
                    btnText={t("close_lesson")} 
                    buttonStyle={getSmallButtonStyle()}
                    style={{width:'7vw'}}
                    btnTextStyle = {classes.btnSmallTextStyle}
                    btnClickHandler={()=>{}}
                    disable={(props.etat==2)}
                /> 

                {/*<CustomButton
                    btnText= {t("close")}
                    buttonStyle={getButtonStyle()}
                    btnTextStyle = {classes.btnTextStyle}
                    btnClickHandler={()=>getPreviousHandler(props.id,props.contenu)}
                    disable={(isValid == false)}
                />*/}                
            </div>

            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignSelf:'center', width:'97%' }}>
                <CustomButton
                    btnText= {'< '+t("previous")}
                    buttonStyle={getSmallButtonStyle()}
                    btnTextStyle = {classes.btnSmallTextStyle}
                    style={{width:'5vw'}}
                    btnClickHandler={()=>getPreviousHandler(props.id,props.contenu)}

                />

                <CustomButton
                    btnText={t("table_of_content")} 
                    buttonStyle={getSmallButtonStyle()}
                    btnTextStyle = {classes.btnSmallTextStyle}
                    style={{width:'6.3vw'}}
                    btnClickHandler={()=>gotoPreface()}
                />


                {(LISTE_LECONS[LISTE_LECONS.length-1].lessonId != props.id) ?
                    <CustomButton
                        btnText={t("next")+' >'}
                        buttonStyle={getSmallButtonStyle()}
                        btnTextStyle = {classes.btnSmallTextStyle}
                        style={{width:'5vw'}}
                        btnClickHandler={()=>getNextHandler(props.id)}
                        //disable={(isValid == false)}
                    />  
                    :
                    null  
                }
                          
            </div>
            <input id={props.contenu.lessonId +"_previousSheet"} type="hidden"  value={props.contenu.previousId} />
            
        </div>            
    );
}
export default Sheet;