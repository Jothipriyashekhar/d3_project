const readline = require('readline');
const fs = require('fs');
var header =[];
var json=[];
var obj={};
var isHeader=true;
var i;
//var sum=0;

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
		else if((header[i]=="Particulars")|| (/3-/i.test(header[i]))) {
			if((splitted[0].includes("Rice Yield Tamil Nadu"))||(splitted[0].includes("Rice Yield Kerala"))||
				(splitted[0].includes("Rice Yield Karnataka"))||(splitted[0].includes("Rice Yield Andhra Pradesh")) ){
				if(i==0) {
						obj[header[i]]=splitted[i];
						flag=true;
						for(i=3;i<25;i++)
							{
								splitted[i]=splitted[i+1].replace("NA","0");
								//sum += parseFloat(splitted[i]);
								// console.log(sum);
						//	obj["year"]=splitted[i];
						obj[header[i]]=parseFloat(splitted[i+1].replace("NA","0"));		

							}	
				
				}
			}
		}         
	}
	if(flag) {
		json.push(obj);
	}
	isHeader=false;	
	fs.writeFileSync("../jsonproject/Southern.json",JSON.stringify(json,null,'\r\n'),"utf8");
	obj={};
});