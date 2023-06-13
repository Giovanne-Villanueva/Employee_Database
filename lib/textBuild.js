


const intro = ()=>{
    let dot = 70;
    let text = 'Welcome to Employee Database!!\n';
    /*for(let i=0; i < dot; i++){
        text = text + '-'
    }*/
    console.log(text);
}

const textBuild = (rows)=>{
    let text = [];
    //let row = '';
    let max = 0;
    let totalMax = 0;

    let key = Object.keys(rows[0]);
    //console.log(key);
    //Populate Array of rows with empty text,so we dont have to deal with NaN later in the code;
    for(let i=0; i<(rows.length+2); i++){
        text.push(' ');
    }

    for(let i=0; i<key.length; i++){
        if(key[i]==='department_name'){
            max = 10;
        }
        else max = key[i].length;

        let skip = false;
        switch(key[i]){
            case `id`:
                text[0] = text[0] +`id`;
                break;
            case `first_name`:
                text[0] = text[0] + `first_name`;
                break;
            case `last_name`:
                text[0] = text[0] + `last_name`;
                break;
            case `title`:
                text[0] = text[0] +`title`;
                break;
            case `department_name`:
                text[0] = text[0] + `department`;
                break;
            case `salary`:
                text[0] = text[0] + `salary`;
                break;
            case `manager_id`:
                text[0] = text[0] + `manager`;
                break;
            default:
                skip = true;
                //console.log(`Error in setting up table`);
                break;
        }

        if(skip){
            skip = false;
        }
        else{
            for(j=0; j<rows.length; j++){
                let row = rows[j];
                //console.log(row);
                //console.log(row[key[i]]);
                //if(row[j][key[i]].includes())
                if(row[key[i]]){
                    if( row[key[i]].toString().length >= max){
                        max = row[key[i]].toString().length;
                    }
                }
            }

            //console.log(`Max is :${max}`);
            
            max++;

            for(j=0; j<rows.length; j++){
                let row = rows[j];
                if(j === 0){
                    let k =0;
                    
                        for( k; k < (max); k++){
                            if( (text[0].length) < (max+totalMax+1) ){
                                text[0] = text[0] + " ";
                            }

                            if( (k + 1) >= max ) text[j+1] = text[j+1] + ' '; 
                            else text[j+1] = text[j+1] + '-';
                        }
                }

                if(row[key[i]]){
                    if(row[key[i]].toString().length < max){
                        
                        text[j+2] = text[j+2] + row[key[i]].toString();
                        
                        let k=row[key[i]].toString().length;
                        for(k; k < (max); k++){
                            text[j+2] = text[j+2] + " ";
                        }
                    }
                    else{
                        //console.log(`I got here second`)
                        text[j+2] = text[j+2] + row[key[i]].toString() + ' ';
                    }
                }
                else{
                    text[j+2] = text[j+2] + `NULL`;
                    for(let k=3; k < (max); k++){
                        text[j+2] = text[j+2] + " ";
                    }
                }
                //console.log(`text is : ${text[j+2]}`)
            }
            //console.log(`I got here`);
            totalMax = totalMax + max;
       
        }   
    }

    for(let i=0; i < text.length; i++){
        console.log(text[i]);
    }
}

module.exports = {
    textBuild,
    intro
}