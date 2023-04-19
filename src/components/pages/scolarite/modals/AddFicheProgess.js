import React from 'react';
import { useFilePicker } from 'use-file-picker';
import classes from "../subPages/SubPages.module.css";
import CustomButton from "../../../customButton/CustomButton";
import { useContext, useState, useEffect } from "react";
import axiosInstance from '../../../../axios';
import axios from 'axios';
import AppContext from '../../../../store/AppContext';
import UiContext from "../../../../store/UiContext";
import { useTranslation } from "react-i18next";


var chosenMsgBox;
const MSG_SUCCESS =1;

function AddFicheProgess(props) {
    const { t, i18n } = useTranslation();
    const currentUiContext = useContext(UiContext);
    const currentAppContext = useContext(AppContext)
    const selectedTheme = currentUiContext.theme;
    
   
    const [isDownload,setIsDownload]= useState(false);
    
    //const [formMode,setFormMode] = useState("creation") //creation, modif, consult


    const [optClasse, setOptClasse] = useState([]);
    const [optCours, setOptCours] = useState([]);

    useEffect(()=> {
        getEtabListClasses();
        getCoursClasse(currentAppContext.currentEtab, 0);
    },[]);


    const getEtabListClasses=()=>{
        var tempTable=[{value: 0,      label: (i18n.language=='fr') ? '  -- Choisir une classe --  ' : '  --Select Class --  '  }]
        
        axiosInstance.post(`list-classes/`, {
            id_sousetab: currentAppContext.currentEtab,
        }).then((res)=>{                
            res.data.map((classe)=>{
                tempTable.push({value:classe.id, label:classe.libelle})              
            })   
            setOptClasse(tempTable);      
        })
         
    }

    function getCoursClasse(sousEtabId, classeId){
        var tempTable=[{value: 0,      label: (i18n.language=='fr') ? '  ----- Choisir  un cours ----- ' : ' ------ Select course ------ '  }]
        var tabMatieres;    
       
        if(classeId!=0){
            tabMatieres = currentAppContext.infoCours.filter((cours)=>cours.id_setab==sousEtabId && cours.id_classe == classeId)
            tabMatieres.map((matiere)=>{
                tempTable.push({value:matiere.id_matiere, label:matiere.libelle_matiere});
            })

        }       

        setOptCours(tempTable);
     
    }
    

    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: 'DataURL',
        accept: '.xls,.xlsx',
        multiple: false,
        limitFilesConfig: { max: 1 },
        // minFileSize: 0.1, // in megabytes
        maxFileSize: 50,
        imageSizeRestrictions: {
          maxHeight: 500, // in pixels
          maxWidth: 500,
          minHeight: 32,
          minWidth: 32,
        },
    });
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors.length) {
        //getUploadError();
        console.log(errors);
    }

    

    
    function getGridButtonStyle()
    { // Choix du theme courant
        switch(selectedTheme){
            case 'Theme1': return classes.Theme1_gridBtnstyle + ' '+ classes.margRight5P ;
            case 'Theme2': return classes.Theme2_gridBtnstyle + ' '+ classes.margRight5P;
            case 'Theme3': return classes.Theme3_gridBtnstyle + ' '+ classes.margRight5P;
            default: return classes.Theme1_gridBtnstyle + ' '+ classes.margRight5P;
        }
    }


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

    function getCurrentHeaderTheme()
    {  // Choix du theme courant
       switch(selectedTheme){
            case 'Theme1': return classes.Theme1_formHeader+ ' ' + classes.formHeader;
            case 'Theme2': return classes.Theme2_formHeader + ' ' + classes.formHeader;
            case 'Theme3': return classes.Theme3_formHeader + ' ' +classes.formHeader;
            default: return classes.Theme1_formHeader + ' ' +classes.formHeader;
        }
    }

    function getNotifButtonStyle()
    { // Choix du theme courant
        switch(selectedTheme){
            case 'Theme1': return classes.Theme1_notifButtonStyle + ' '+ classes.margRight5P ;
            case 'Theme2': return classes.Theme2_notifButtonStyle + ' '+ classes.margRight5P;
            case 'Theme3': return classes.Theme3_notifButtonStyle + ' '+ classes.margRight5P;
            default: return classes.Theme1_notifButtonStyle + ' '+ classes.margRight5P;
        }
    }

   
    /************************************ Handlers ************************************/    
    
    function classeChangeHandler(e){
       var classeId;
        if(e.target.value != optClasse[0].value){
            classeId = e.target.value ;
            getCoursClasse(currentAppContext.currentEtab, classeId);
        }else{
            getCoursClasse(currentAppContext.currentEtab, 0);
        }

    }


    function coursChangeHandler(e){

    }
    

    function downloadHandler(e){
        fetch('http://localhost:3000/fiches',{
            method: 'GET',
            headers:{
                'Content-Type':'blob'
            },
            responseType:'arraybuffer'
        })
        .then(response =>{
            response.blob().then(blob=> {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download ='FicheProgression.xls';
                a.click();
            })
            //window.location.href=response.url;
        })

    }

    function getUploadError(){
        var errorMsg;
        if(errors.length){
            if(errors[0].fileSizeTooSmall)  {
                errorMsg = 'Le fichier selectionne est trop lourd! la taille du fichier ne doit pas exceder 50Mo !!!';
                return errorMsg;
            }
            
            if(errors[0].fileSizeToolarge)  {
                errorMsg = 'Le fichier selectionne est tres petit! la taille du fichier doit depasser 0.5ko !!!';
                return errorMsg;
            }

            if(errors[0].imageHeightTooSmall)  {
                errorMsg = 'Le fichier a de tres petites dimension !!!';
                return errorMsg;
            }

            if(errors[0].imageWidthTooSmall)  {
                errorMsg = 'Le fichier a de tres petites dimension !!!';
                return errorMsg;
            }    

            if(errors[0].imageHeightTooBig)  {
                errorMsg = 'Le fichier a de grandes dimensions  !!!';
                return errorMsg;
            }

            if(errors[0].imageWidthTooBig)  {
                errorMsg = 'Le fichier a de grandes dimensions  !!!';
                return errorMsg;
            }            
        }       
    }


    function saveFicheProgressChanges(){
        if(isDownload) props.cancelHandler();
        else{
            uploadFile(filesContent[0].content, filesContent[0].name);
        }
    }

    function uploadFile(fileData, fileName){
        var formData = new FormData();
        formData.append("upload",fileData, fileName);
        axiosInstance.post(`upload-fiche-progression/`, formData, {
                 
        }).then((res)=>{

            console.log(res.data);
            props.cancelHandler();
           
            chosenMsgBox = MSG_SUCCESS;
            currentUiContext.showMsgBox({
                visible:true, 
                msgType:"info", 
                msgTitle:t("success_modif_M"), 
                message:t("success_modif")
            })
            
        })

    }


    /*const downloadHandler2 = async() => {
        const headers = { 'Content-Type':'blob'};
        const config: AxiosRequestConfig = {method:'GET', url:URL,responseType:'arraybuffer',headers};
    }*/

    /************************************ JSX Code ************************************/

    return (
        <div className={'card '+ classes.formContainerPPP}>
            <div className={getCurrentHeaderTheme()}>
                <div className={classes.formImageContainer}>
                    <img alt='add student' className={classes.formHeaderImg} src='images/FicheProgession.png'/>
                </div>
                           
                    <div className={classes.formMainTitle} >
                        {t("OBTENTION DE MODELE OU DEPOT DE FICHE DE PROGRESSION")}
                    </div>
                
            </div>

            {(errors.length) ?
                    <div className={classes.formErrorMsg} style={{marginTop:'3vh'}}> {getUploadError()}</div>
                    :
                    null
                }           
                <div id='errMsgPlaceHolder'/> 
            
                <div className={classes.etape}>                   

                    <div className={classes.inputRow}>
                        <div className={classes.groupInfo} >
                            <div className={classes.inputRowLeft}> 
                                <div style={{display:'flex', flexDirection:'row',  marginLeft:"-2.3vw"}}>
                                    <input type='radio' style={{width:'1.7vw', height:'2.3vh'}} checked={isDownload==false}  value={'presents'} name='profpresents' onClick={()=>{isDownload? setIsDownload(false):setIsDownload(true)}}/>
                                    <label style={{color:'black',  fontWeight:"bold", fontSize:"1vw", marginRight:"0.3vw", marginLeft:"0.3vw", marginTop:"0vw"}}> Deposer une fiche de progression remplie</label>

                                    <input type='radio' style={{width:'1.7vw', height:'2.3vh'}} checked={isDownload==true}  value={'presents'} name='profpresents' onClick={()=>{isDownload? setIsDownload(false):setIsDownload(true)}}/>
                                    <label style={{color:'black', fontWeight:"bold", fontSize:"1vw", marginLeft:'0.13vw', marginRight:"1vw",marginTop:"0vw" }}>Obtenir le modele de fiche de progression a remplir </label>
                                </div>                     
                            </div>
                            {isDownload ?
                                <div className={classes.inputRowLeft} style={{marginTop:'7vh'}}> 
                                    <input id="id" type="hidden"  defaultValue={currentUiContext.formInputs[11]}/>
                                   
                                    <CustomButton
                                        btnText={t('Telecharger le modele de fiche de progression en cliquant ici ')}
                                        hasIconImg= {true}
                                        imgSrc='images/saveToDisk_trans.png'
                                        imgStyle = {classes.grdBtnImgStyle}  
                                        buttonStyle={getNotifButtonStyle()}
                                        btnTextStyle = {classes.notifBtnTextStyle}
                                        btnClickHandler={downloadHandler}
                                        //disable={(isValid==false)}   
                                    />
                                </div>
                                :
                                <div className={classes.groupInfo} style={{marginBottom:'3.7vh', marginTop:'2.7vh'}}>
                                    <div className={classes.inputRowLeft} style={{marginBottom:'3vw'}}> 
                                        <div style={{width:'19vw', fontWeight:570}}>
                                            Classe :  
                                        </div>
                                            
                                        <div style={{marginBottom:'1.3vh', marginLeft:'-5.7vw'}}> 
                                            
                                            <select id='optClasse' defaultValue={1} onChange={classeChangeHandler} className={classes.comboBoxStyle} style={{marginLeft:'-8.7vw', height:'1.73rem',width:'12vw'}}>
                                                {(optClasse||[]).map((option)=> {
                                                    return(
                                                        <option  value={option.value}>{option.label}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                         
                                        <div className={classes.inputRowLabel} style={{fontWeight:570, marginLeft:'2.3vw'}}>
                                            Cours :  
                                        </div>
                                        
                                        <div style={{marginBottom:'1.3vh', marginLeft:'-2vw'}}>  
                                            
                                            <select id='optCours' defaultValue={1} onChange={coursChangeHandler} className={classes.comboBoxStyle} style={{marginLeft:'-5.7vw', height:'1.73rem',width:'15vw'}}>
                                                {(optCours||[]).map((option)=> {
                                                    return(
                                                        <option  value={option.value}>{option.label}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        
                                    </div>

                                    <div className={classes.inputRowLeft}> 
                                        <div className={classes.inputRowLabel} style={{fontWeight:570}}>
                                            Fichier: 
                                        </div>                    
                                        <div style={{marginBottom:'1.3vh', marginLeft:'-2vw', marginRight:'2vw'}}> 
                                            <input id="file" type="text" disabled={true} className={classes.inputRowControl }   style={{width:'20.3vw', height:'1.3rem', marginLeft:'-5.7vw'}} value={(filesContent.length!=0) ? filesContent[0].name:""} />
                                        </div>
                                        
                                        
                                        <CustomButton
                                            btnText='Deposer fichier' 
                                            buttonStyle={getNotifButtonStyle()}
                                            btnTextStyle = {classes.gridBtnTextStyleP}
                                            btnClickHandler={openFileSelector}
                                        />
                                    </div>
                                                          
                                </div>
                            }

                        </div>
                       
                    </div>

                </div>
            
            <div className={classes.formButtonRowP}>
                <CustomButton
                    btnText='Annuler' 
                    buttonStyle={getGridButtonStyle()}
                    btnTextStyle = {classes.btnTextStyle}
                    btnClickHandler={props.cancelHandler}
                />

                <CustomButton
                    btnText='Ok' 
                    buttonStyle={getGridButtonStyle()}
                    btnTextStyle = {classes.btnTextStyle}
                    btnClickHandler={saveFicheProgressChanges}
                />
                
            </div>

        </div>
       
    );
 }
 export default AddFicheProgess;
 