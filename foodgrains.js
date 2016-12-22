const readline = require('readline');
const fs = require('fs');
var header =[];
var json=[];
var obj={};
var isHeader=true;
var i;

const r = readline.createInterface({
	input: fs.createReadStream('Agriculture.csv', 'utf-8')
});


r.on('line', function(line) {
	var splitted= line.split(',');
	var flag =false;
	for(i=0;i<splitted.length;i++) {
		if(isHeader) { 
			header[i]=splitted[i].trim();
		}
		else if((header[i]=="Particulars")|| (header[i]=="3-2013")) {
			if(splitted[0].includes("Foodgrain")) {
				if((splitted[0].includes("Target"))||(splitted[0].includes("Achievements"))|| 
					(splitted[0].includes("Yield"))|| (splitted[0].includes("Area"))|| 
					(splitted[0].includes("Volume"))|| (splitted[0].includes("Other Cash Crops "))||
					(splitted[0].includes("Oilseeds Nine Oilseeds"))||(splitted[0].includes("Total"))) {
					break;
				}
				else {
					flag=true;
					//console.log(header[i]);
					if(i==0) {
						obj[header[i]]=splitted[i];
						//console.log(obj);
					}
					else {
						obj[header[i].replace("3-2013","value")]=parseFloat(splitted[i+1].replace("NA","0"));
						//console.log(obj);
					}
				}
			}
		}         
	}
	if(flag) {
		json.push(obj);
	}
	isHeader=false;	
	fs.writeFileSync("../jsonproject/Foodgrain.json",JSON.stringify(json,null,'\r\n'),"utf8");
	obj={};
});