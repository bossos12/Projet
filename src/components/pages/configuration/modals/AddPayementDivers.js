import React from 'react';
import classes from "../subPages/SubPages.module.css";
import CustomButton from "../../../customButton/CustomButton";
import UiContext from "../../../../store/UiContext";
import { useContext, useState, useEffect } from "react";


function AddPayementDivers(props) {
    const currentUiContext = useContext(UiContext);
    const [isValid, setIsValid] = useState(props.formMode=='modif');
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
    function getSelectDropDownTextColr() {
        switch(selectedTheme){
            case 'Theme1': return 'rgb(60, 160, 21)';
            case 'Theme2': return 'rgb(64, 49, 165)';
            case 'Theme3': return 'rgb(209, 30, 90)';
            default: return 'rgb(60, 160, 21)';
        }   
    }
    let opt = [{value:"e",label:"Entrée"},{value:"s",label:"Sortie"}]
    function createOption(tabOption,idField, labelField){
        var newTab=[];
        for(var i=0; i< tabOption.length; i++){
            var obj={
                value: tabOption[i][idField],
                label: tabOption[i][labelField]
            }
            newTab.push(obj);
        }
        return newTab;
    }

    useEffect(()=> {
        // setOptCycle(createOption(currentAppContext.infoCycles.filter((cycle)=>cycle.id_setab == currentAppContext.currentEtab),'id_cycle','libelle')); 
    },[])

    function getSmallButtonStyle()
    { // Choix du theme courant
      switch(selectedTheme){
        case 'Theme1': return classes.Theme1_BtnstyleSmall ;
        case 'Theme2': return classes.Theme2_BtnstyleSmall ;
        case 'Theme3': return classes.Theme3_BtnstyleSmall ;
        default: return classes.Theme1_BtnstyleSmall ;
      }
    }

    /************************************ Handlers ************************************/
   
    function putToEmptyStringIfUndefined(chaine){
        if (chaine==undefined) return '';
        else return chaine;
    }

    function handleChange(e){
        var payement;
       
        payement = (document.getElementById('libelle').value != undefined) ? document.getElementById('libelle').value.trim() : putToEmptyStringIfUndefined(document.getElementById('libelle').defaultValue).trim;        
        if(payement.length == 0) { 
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }

    /************************************ JSX Code ************************************/

    return (
        <div className={classes.formStyle}>
            <div id='errMsgPlaceHolder'/>

            <div className={classes.inputRowLeft}> 
                <div className={classes.inputRowLabel}>
                    Libelle :  
                </div>
                    
                <div> 
                    <input id="libelle" type="text" className={classes.inputRowControl + ' formInput'} onChange={handleChange} defaultValue={currentUiContext.formInputs[0]} />
                </div>
            </div>

            <div className={classes.inputRowLeft}> 
                <div className={classes.inputRowLabel}>
                    Montant :  
                </div>
                    
                <div> 
                    <input id="montant" type="text" className={classes.inputRowControl + ' formInput'} onChange={handleChange} defaultValue={currentUiContext.formInputs[1]}/>
                </div>
            </div>

            <div className={classes.inputRowLeft}> 
                <div className={classes.inputRowLabel}>
                    E/S :  
                </div>
                <div style={{marginBottom:'1.3vh'}}> 
                    {<select className={classes.comboBoxStyle} defaultValue={currentUiContext.formInputs[3]} id="e_s" style={{color:getSelectDropDownTextColr(), width:'9.3vw',borderColor:getSelectDropDownTextColr()}}
                    // onChange={dropDownCycleChangeHandler}
                    >  
                        {                        
                        (opt||[]).map((option)=> {
                            return(
                                <option key={option.value} style={{color:'black'}} value={option.value}>{option.label}</option>
                            );
                        })}
                    </select>}
                </div>
            </div>

            <div>
                <input id="idPayement" type="hidden"  defaultValue={currentUiContext.formInputs[2]}/>
            </div>
            <div className={classes.buttonRow}>
                <CustomButton
                    btnText='Annuler' 
                    buttonStyle={getButtonStyle()}
                    btnTextStyle = {classes.btnTextStyle}
                    btnClickHandler={props.cancelHandler}
                />
                
                <CustomButton
                    btnText={(props.formMode=='creation') ? 'Valider':'Modifier'} 
                    buttonStyle={getButtonStyle()}
                    btnTextStyle = {classes.btnTextStyle}
                    btnClickHandler={(isValid) ? props.actionHandler : null}
                    disable={!isValid}
                />
                
            </div>

            

        </div>
       
     );
 }
 export default AddPayementDivers;
 