import React from 'react';
import classes from "../subPages/SubPages.module.css";
import CustomButton from "../../../customButton/CustomButton";
import UiContext from "../../../../store/UiContext";
import { useContext, useState, useEffect } from "react";
import Select from 'react-select'


function AddEnseignantSpecialites(props) {
    const currentUiContext = useContext(UiContext);
    const [isValid, setIsValid] = useState(props.formMode=='modif');
    const [optMatiere1, setOptMatiere1] = useState();
    const [optMatiere2, setOptMatiere2] = useState();
    const [optMatiere3, setOptMatiere3] = useState();
    // const [optGroupe, setOptGroupe] = useState();
    // const [matieres, setMatieres] = useState([]);
    // const [idGroupe, setIdGroupe] = useState("");
    // const [idCours, setIdCours] = useState("");
    // const [cpteGroupe, setCpteGroupes] = useState(0);
    const [changeSpe1Selected, setChangeSpe1Selected] = useState();
    const [changeSpe2Selected, setChangeSpe2Selected] = useState();
    const [changeSpe3Selected, setChangeSpe3Selected] = useState();
    const selectedTheme = currentUiContext.theme;

    let num_groupe = 0;
    function getButtonStyle()
    { // Choix du theme courant
      switch(selectedTheme){
        case 'Theme1': return classes.Theme1_Btnstyle ;
        case 'Theme2': return classes.Theme2_Btnstyle ;
        case 'Theme3': return classes.Theme3_Btnstyle ;
        default: return classes.Theme1_Btnstyle ;
      }
    }

    
    let optGrpSpe=[{value:"0",label:"Non"},{value:"1",label:"Oui"}]
    let matiereVide={value:"-1",label:"----------"}

    function getSmallButtonStyle()
    { // Choix du theme courant
      switch(selectedTheme){
        case 'Theme1': return classes.Theme1_BtnstyleSmall ;
        case 'Theme2': return classes.Theme2_BtnstyleSmall ;
        case 'Theme3': return classes.Theme3_BtnstyleSmall ;
        default: return classes.Theme1_BtnstyleSmall ;
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
    function createOption(libellesOption,idsOption){
        var newTab=[];
        for(var i=0; i< libellesOption.length; i++){
            var obj={
                value: idsOption[i],
                label: libellesOption[i]
            }
            newTab.push(obj);
        }
        return newTab;
    }
    function createOption2(libellesOption){
        var newTab=[];
        newTab.push(matiereVide);
        for(var i=0; i< libellesOption.length; i++){
            var obj={
                value: libellesOption[i].id,
                label: libellesOption[i].libelle
            }
            newTab.push(obj);
        }
        return newTab;
    }
function getLibelleMatiereFromId(id,matieres){
    var libelle="";
    for(var i=0; i< matieres.length; i++){
        if(matieres[i].id==id){
            libelle = matieres[i].libelle
            break;
        }
    }
    return libelle;
}
    useEffect(()=> {
        console.log("**** ",currentUiContext.formInputs[6]);
        setOptMatiere1(createOption2(currentUiContext.formInputs[6]));
        setOptMatiere2(createOption2(currentUiContext.formInputs[6]));
        setOptMatiere3(createOption2(currentUiContext.formInputs[6]));
        let id_spe1 = currentUiContext.formInputs[3];
        let id_spe2 = currentUiContext.formInputs[4];
        let id_spe3 = currentUiContext.formInputs[5];
        let matieres = currentUiContext.formInputs[6];
        let libelle1 = getLibelleMatiereFromId(id_spe1,matieres);
        let libelle2 = getLibelleMatiereFromId(id_spe2,matieres);
        let libelle3 = getLibelleMatiereFromId(id_spe3,matieres);
        if(id_spe1!="")
            setChangeSpe1Selected({value:id_spe1,label:libelle1});
        else
            setChangeSpe1Selected(matiereVide);
        if(id_spe2!="")
            setChangeSpe2Selected({value:id_spe2,label:libelle2});
        else
            setChangeSpe2Selected(matiereVide);
        if(id_spe3!="")
            setChangeSpe3Selected({value:id_spe3,label:libelle3});
        else
            setChangeSpe3Selected(matiereVide);
    },[])

    /************************************ Handlers ************************************/

    function dropDownSpe1ChangeHandler(e){
        setChangeSpe1Selected(e);
        document.getElementById('id_spe1').value = e.value;
      }
    function dropDownSpe2ChangeHandler(e){
        setChangeSpe2Selected(e);
        document.getElementById('id_spe2').value = e.value;
      }
    function dropDownSpe3ChangeHandler(e){
        setChangeSpe3Selected(e);
        document.getElementById('id_spe3').value = e.value;
      }

    /************************************ JSX Code ************************************/

    return (
        <div className={classes.formStyle}>
            <div className={classes.inputRowCenter}> 
                <div className={classes.inputRowLabel}>
                <h5>{currentUiContext.formInputs[1]}  {currentUiContext.formInputs[2]} </h5>
                 <br />
                </div>
            </div>
            <div className={classes.inputRowLeft}> 
                <div className={classes.inputRowLabel}>
                    <h6>Matière1:</h6>
                </div>
                <div style={{marginBottom:'1.3vh'}}> 
                    <Select
                        options={optMatiere1}
                        // className={classes.comboBoxStyle}
                        classNamePrefix="select"
                        style={{color:getSelectDropDownTextColr(), width:'12.3vw',borderColor:getSelectDropDownTextColr()}}
                        value={changeSpe1Selected}
                        // styles={customStyles}
                        onChange={dropDownSpe1ChangeHandler} 
                    />
                </div>
            </div> 
            <div className={classes.inputRowLeft}> 
                <div className={classes.inputRowLabel}>
                    <h6>Matière2:</h6>
                </div>
                <div style={{marginBottom:'1.3vh'}}> 
                    <Select
                        options={optMatiere2}
                        // className={classes.comboBoxStyle}
                        classNamePrefix="select"
                        style={{color:getSelectDropDownTextColr(), width:'12.3vw',borderColor:getSelectDropDownTextColr()}}
                        value={changeSpe2Selected}
                        // styles={customStyles}
                        onChange={dropDownSpe2ChangeHandler} 
                    />
                </div>
            </div> 
            <div className={classes.inputRowLeft}> 
                <div className={classes.inputRowLabel}>
                    <h6>Matière3:</h6>
                </div>
                <div style={{marginBottom:'1.3vh'}}> 
                    <Select
                        options={optMatiere3}
                        // className={classes.comboBoxStyle}
                        classNamePrefix="select"
                        style={{color:getSelectDropDownTextColr(), width:'12.3vw',borderColor:getSelectDropDownTextColr()}}
                        value={changeSpe3Selected}
                        // styles={customStyles}
                        onChange={dropDownSpe3ChangeHandler} 
                    />
                </div>
            </div> 
            
            <div>
                <input id="id_ens" type="hidden"  defaultValue={currentUiContext.formInputs[0]}/>
                <input id="id_spe1" type="hidden"  defaultValue={currentUiContext.formInputs[3]}/><br />
                <input id="id_spe2" type="hidden"  defaultValue={currentUiContext.formInputs[4]}/><br />
                <input id="id_spe3" type="text"  defaultValue={currentUiContext.formInputs[5]}/>
                <input id="id_user" type="hidden"  defaultValue={currentUiContext.formInputs[7]}/>

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
 export default AddEnseignantSpecialites;
 