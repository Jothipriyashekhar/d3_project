const readline = require('readline');
const fs = require('fs');
var header =[];
var json1=[];
var json2=[];
var json3=[];
var json4=[];

var obj1={};
var obj2={};
var obj3={};
var obj4={};
var isHeader=true;
var i;
var sum=0;
var sum1=0;
const r = readline.createInterface({
	input: fs.createReadStream('Agriculture.csv', 'utf-8')
});
r.on('line', function(line) {
	var splitted= line.split(',');
	var flag1 =false;
	var flag2=false;
	var flag3=false;
	var flag4=false;
	for(i=0;i<splitted.length;i++) {
		if(isHeader) { 
			header[i]=splitted[i].trim();
		}
		else if(splitted[0].includes("Oilseeds")&&!splitted[0].includes("Foodgrain")) {
		 if((header[i]=="Particulars")|| (header[i]=="3-2013")) {
				
				if((splitted[0].includes("Target"))||
					(splitted[0].includes("Achievements"))|| (splitted[0].includes("Yield"))|| 
					(splitted[0].includes("Area"))){
					break;
				}
				else {
					flag1=true;
					//console.log(header[i]);
					if(i==0) {
						obj1[header[i]]=splitted[i];
						//console.log(obj);
					}
					else {
						obj1[header[i].replace("3-2013","value")]=parseFloat(splitted[i+1].replace("NA",21));
						//console.log(obj);
					}
				}
			}
		} 

		else if((header[i]=="Particulars")|| (header[i]=="3-2013")) {
			if(splitted[0].includes("Foodgrain")&&!splitted[0].includes("Oilseeds")) {
				if((splitted[0].includes("Target"))||(splitted[0].includes("Achievements"))|| 
					(splitted[0].includes("Yield"))|| (splitted[0].includes("Area"))|| 
					(splitted[0].includes("Volume"))|| (splitted[0].includes("Other Cash Crops "))||
					(splitted[0].includes("Oilseeds Nine Oilseeds"))||(splitted[0].includes("Total"))) {
					break;
				}
				else {
					flag2=true;
					//console.log(header[i]);
					if(i==0) {
						obj2[header[i]]=splitted[i];
						//console.log(obj);
					}
					else {
						obj2[header[i].replace("3-2013","value")]=parseFloat(splitted[i+1].replace("NA",21));
						//console.log(obj);
					}
				}
			}
		}
		 console.log("hai");
			 if((splitted[0].includes("Rice Yield Tamil Nadu"))||(splitted[0].includes("Rice Yield Kerala"))||
				(splitted[0].includes("Rice Yield Karnataka"))||(splitted[0].includes("Rice Yield Andhra Pradesh")) ){
				if((header[i]=="Particulars")|| (/3-/i.test(header[i]))) {
					if(i==0) {
						obj3[header[i]]=splitted[i];
						for(i=3;i<25;i++)
							{
								splitted[i]=splitted[i+1].replace("NA",21);
								sum += parseFloat(splitted[i]);
								// console.log(sum);
								obj3["rice production"]=sum;
								flag3=true;

							}	
				
				}
			}
		}

		 
			else if(splitted[0].includes("Commercial")) {
				if ((header[i]=="Particulars")|| (/3-/i.test(header[i]))) {
				if(i==0) {
						obj4[header[i]]=splitted[i];
						for(i=3;i<25;i++)
							{
								splitted[i]=splitted[i+1].replace("NA",21);
								sum1 += parseFloat(splitted[i]);
								// console.log(sum);
								obj4["year"]=sum1;
								flag4=true;

							}	
				
				}
			}
		}                              
	}
	if(flag1) {
		json1.push(obj1);
	}
	if(flag2) {
		json2.push(obj2);
	}
	if(flag3) {
		json3.push(obj3);
	}
	if(flag4) {
		json4.push(obj4);
	}

	isHeader=false;	
	fs.writeFileSync("../json/Oilseeds.json",JSON.stringify(json1,null,'\r\n'),"utf8");
	fs.writeFileSync("../json/Foodgrain.json",JSON.stringify(json2,null,'\r\n'),"utf8");
	fs.writeFileSync("../json/Southern.json",JSON.stringify(json3,null,'\r\n'),"utf8");
	fs.writeFileSync("../json/Commercial.json",JSON.stringify(json4,null,'\r\n'),"utf8");
	obj1={};
	obj2={};
	obj3={};
	obj4={};
});