//----------- COMPARE FUNCTIONS ---------------------

function nameCompare(a, b){
    if (a.lname.toLowerCase() === b.lname.toLowerCase()){
        return fnameCompare(a, b);
    }
    else if (a.lname.toLowerCase() < b.lname.toLowerCase()) return -1;
    else if (a.lname.toLowerCase() > b.lname.toLowerCase()) return 1;
    return 0;
}
function fnameCompare(a, b){
    if (a.fname.toLowerCase() < b.fname.toLowerCase())return -1;
    else if (a.fname.toLowerCase() > b.fname.toLowerCase()) return 1;
    return 0;
}


function startDateCompare(a, b){
    
    let aStartArray = a.startDate.split('/');
    let bStartArray = b.startDate.split('/');
    
    //console.log(aStartArray);
    //console.log(bStartArray);
    
    for (let i = 0; i < aStartArray.length; i++){
        if (aStartArray[i].length != 2){
            aStartArray[i] = 0 + aStartArray[i];
        }
        if (bStartArray[i].length != 2){
            bStartArray[i] = 0 + bStartArray[i];
        }
    }

    
    let dateA = aStartArray[2] + aStartArray[0] + aStartArray[1];
    let dateB = bStartArray[2] + bStartArray[0] + bStartArray[1];
    
    
    
    if (dateA < dateB) return -1;
    else if (dateA > dateB) return 1;
    return 0;
}
function cityCompare(a, b){
    if (a.city.toLowerCase() < b.city.toLowerCase())return -1;
    else if (a.city.toLowerCase() > b.city.toLowerCase()) return 1;
    return 0;
}
function stateCompare(a, b){
    if (a.state.toLowerCase() < b.state.toLowerCase())return -1;
    else if (a.state.toLowerCase() > b.state.toLowerCase()) return 1;
    return 0;
}
function zipCompare(a, b){
    if (a.zip < b.zip)return -1;
    else if (a.zip > b.zip) return 1;
    return 0;
}
function yearCompare(a, b){
    if (a.year < b.year)return -1;
    else if (a.year > b.year) return 1;
    return 0;
}

function idCompare(a, b){
    if (a.id < b.id) return -1;
    else if (a.id > b.id) return 1;
    return 0;
}