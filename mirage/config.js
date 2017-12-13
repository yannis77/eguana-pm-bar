// mirage/config.js
export default function() {
 // this.namespace = 'api';
//var text1 ='{"nameXAxis": "Zeit", "data": [{"pointid": null, "starttime": 1454396400000, "endtime": 1454409000000, "comment": "Gestörter Bauablauf", "y": 4, "color": "#e57373", "Status": 3 }, { "pointid": null, "starttime": 1454409000000, "endtime": 1454412000000, "comment": "Gestörter Bauablauf", "y": 4, "Status": 3, "color": "#e57373" }, { "pointid": null, "starttime": 1454412000000, "endtime": 1454414400000, "comment": "", "y": 3, "Status": 3, "color": "#ff9800" }, { "starttime": 1454414400000, "endtime": 1454421298000, "comment": "", "y": 5, "Status": 3, "color": "#3f51b5" }, { "pointid": null, "starttime": 1454421298000, "endtime": 1454422198000, "comment": null, "y": 3, "Status": 3, "color": "#ff9800" }, { "pointname": "258F_01213a1_1_1", "pointid": 9143, "starttime": 1454422198000, "endtime": 1454422230000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454422230000, "endtime": 1454422269000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258F_01213a1_1_2", "pointid": 9149, "starttime": 1454422269000, "endtime": 1454422301000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454422301000, "endtime": 1454422341000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a1_1_1", "pointid": 9150, "starttime": 1454422341000, "endtime": 1454422374000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454422374000, "endtime": 1454423442000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a1_1_1", "pointid": 9156, "starttime": 1454423442000, "endtime": 1454423468000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454423468000, "endtime": 1454424405000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a1_1_2", "pointid": 9171, "starttime": 1454424405000, "endtime": 1454424476000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454424476000, "endtime": 1454424502000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a2_1_2", "pointid": 9172, "starttime": 1454424502000, "endtime": 1454424572000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454424572000, "endtime": 1454424609000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a3_1_2", "pointid": 9175, "starttime": 1454424609000, "endtime": 1454424677000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454424677000, "endtime": 1454424729000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a4_1_2", "pointid": 9178, "starttime": 1454424729000, "endtime": 1454424873000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454424873000, "endtime": 1454425278000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a5_1_3", "pointid": 9181, "starttime": 1454425278000, "endtime": 1454425604000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454425604000, "endtime": 1454425914000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a6_1_3", "pointid": 9184, "starttime": 1454425914000, "endtime": 1454425948000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454425948000, "endtime": 1454426303000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a1_1_4", "pointid": 9187, "starttime": 1454426303000, "endtime": 1454426360000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454426360000, "endtime": 1454426431000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a5_1_4", "pointid": 9188, "starttime": 1454426431000, "endtime": 1454426495000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454426495000, "endtime": 1454427158000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a6_1_5", "pointid": 9189, "starttime": 1454427158000, "endtime": 1454427205000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454427205000, "endtime": 1454427548000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a7_1_5", "pointid": 9190, "starttime": 1454427548000, "endtime": 1454427642000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454427642000, "endtime": 1454427731000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a8_1_5", "pointid": 9193, "starttime": 1454427731000, "endtime": 1454427841000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454427841000, "endtime": 1454427943000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a9_1_5", "pointid": 9196, "starttime": 1454427943000, "endtime": 1454428343000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454428343000, "endtime": 1454428408000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a1_1_6", "pointid": 9199, "starttime": 1454428408000, "endtime": 1454428795000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454428795000, "endtime": 1454428933000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a1_1_7", "pointid": 9200, "starttime": 1454428933000, "endtime": 1454429157000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454429157000, "endtime": 1454429296000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a2_1_7", "pointid": 9201, "starttime": 1454429296000, "endtime": 1454430381000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454429400000, "endtime": 1454432400000, "comment": "", "y": 3, "Status": 3, "color": "#ff9800" }, { "pointname": "258H_01213a3_1_7", "pointid": 9202, "starttime": 1454430427000, "endtime": 1454430907000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "starttime": 1454430907000, "endtime": 1454432400000, "comment": "", "y": 5, "Status": 3, "color": "#3f51b5" }, { "pointid": null, "starttime": 1454432400000, "endtime": 1454439600000, "comment": "Umsetzen Tunnel-Tunnel", "y": 4, "Status": 3, "color": "#e57373" }, { "pointname": "258H_01213a2_1_8", "pointid": 9203, "starttime": 1454436235000, "endtime": 1454436791000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454436791000, "endtime": 1454437476000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a1_1_8", "pointid": 9204, "starttime": 1454437476000, "endtime": 1454437715000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454437715000, "endtime": 1454437995000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a2_1_9", "pointid": 9205, "starttime": 1454437995000, "endtime": 1454438056000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454438056000, "endtime": 1454438693000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a2_1_1", "pointid": 9206, "starttime": 1454438693000, "endtime": 1454439175000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454439175000, "endtime": 1454439600000, "comment": null, "y": 3, "Status": 3, "color": "#ff9800" }, { "starttime": 1454439600000, "endtime": 1454457895000, "comment": "", "y": 5, "Status": 3, "color": "#3f51b5" }, { "pointid": null, "starttime": 1454457895000, "endtime": 1454458795000, "comment": null, "y": 3, "Status": 3, "color": "#ff9800" }, { "pointname": "258H_01213a1_1_2", "pointid": 9207, "starttime": 1454458795000, "endtime": 1454459276000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454459276000, "endtime": 1454479970000, "comment": "", "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a2_1_6", "pointid": 9209, "starttime": 1454479970000, "endtime": 1454480222000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" }, { "pointid": null, "starttime": 1454480222000, "endtime": 1454480278000, "comment": null, "y": 2, "Status": 3, "color": "#81d4fa" }, { "pointname": "258H_01213a2_1_5", "pointid": 9210, "starttime": 1454480278000, "endtime": 1454483435000, "comment": null, "y": 1, "Status": 3, "color": "#2196f3" } ]}';
var text1 ='{"nameXAxis": "Zeit", "data": [{"pointid": null, "starttime": 1454396400000, "endtime": 1454409000000, "comment": "Gestörter Bauablauf", "y": 4, "yOriginal":4, "color": "#e57373", "Status": 3, "hasChildren":false }, { "pointid": null, "starttime": 1454412000000, "endtime": 1454414400000, "comment": "", "y": 3, "yOriginal":3, "Status": 3, "color": "#ff9800", "hasChildren":false }, { "starttime": 1454414400000, "endtime": 1454421298000, "comment": "", "y": 5, "yOriginal":5, "Status": 3, "color": "#3f51b5", "hasChildren":false }, { "pointname": "258F_01213a1_1_2", "pointid": 9149, "starttime": 1454420000000, "endtime": 1454422301000, "comment": null, "y": 1, "yOriginal":1, "Status": 3, "color": "#2196f3","hasChildren":false }, { "pointid": null, "starttime": 1454422374000, "endtime": 1454423442000, "comment": null, "y": 2, "yOriginal":2, "Status": 3, "color": "#81d4fa", "hasChildren":false } ]}';
var text2= '["IJ: Injektion","UP: Umsetzen IP","SL: Setzen/Lösen Packer","StV: Stillstand vortriebsbedingt", "KS: Keine Schichtbelegung"]';
//main data as expected by the component to be returned on get
var data ={dataObject:null, axisTickTransform:null};

var extraData = [];

data.dataObject=JSON.parse(text1);

data.axisTickTransform=JSON.parse(text2);

//create additional process data. 

	for (var i=0; i< data.dataObject.data.length; i++)
	{//add activities for each timesheet
		var st=data.dataObject.data[i].starttime;
		var et=data.dataObject.data[i].endtime;
		var yy=data.dataObject.data[i].y;
		var yO=data.dataObject.data[i].yOriginal;
		var olCol=data.dataObject.data[i].color;
		var totlen=et-st;

		extraData.push({"pointid": "noID", "starttime": st, "endtime":st+(totlen/4) , "comment": "no Comment", "y": yy, "yOriginal": yO, "color": olCol, "Status": 3, "y2": 1, "detail":true , "maxY":0});
		extraData.push({"pointid": "noID", "starttime": st+(3*(totlen/4)), "endtime":et , "comment": "no Comment", "y": yy, "yOriginal": yO, "color": olCol, "Status": 3, "y2": 1, "detail":true , "maxY":0});

		if(i!=1)
		{
			extraData.push({"pointid": null, "starttime": st+ (2*(totlen/4)), "endtime": st+(3*(totlen/4)), "comment": "", "y": yy, "yOriginal": yO, "color": olCol, "Status": 3, "y2": 1, "detail":true , "maxY":0 });
			extraData.push({"pointid": null, "starttime": st+ (totlen/4), "endtime": et- (totlen/3), "comment": "", "y": yy, "yOriginal": yO, "color": olCol, "Status": 3, "y2": 2, "detail":true , "maxY":0 });
			extraData.push({"pointid": null, "starttime": st, "endtime": st+(totlen/4), "comment": "", "y": yy, "yOriginal": yO, "color": olCol, "Status": 3, "y2": 3, "detail":true , "maxY":0 });
			extraData.push({"pointid": null, "starttime": st+ (2*(totlen/4)), "endtime": et, "comment": "", "y": yy, "yOriginal": yO, "color": olCol, "Status": 3, "y2": 3, "detail":true , "maxY":0 });
			if(i>2)
			{
				extraData.push({"pointid": null, "starttime": st+ (totlen/4), "endtime": et- (totlen/3), "comment": "", "y": yy, "yOriginal": yO, "color": olCol, "Status": 3, "y2":4, "detail":true , "maxY":0 });
				extraData.push({"pointid": null, "starttime": st, "endtime": et, "comment": "", "y": yy, "yOriginal": yO, "color": olCol, "Status": 3, "y2":5, "detail":true , "maxY":0 });
			}
		}
	}


//return full data upon request
  this.get('/basedata', () => {
    return data;
  });

//get the interval request and reply
this.post('/basedata', function(db, request) {
	var interval=JSON.parse(request.requestBody);
	var stTime=interval.data[0].startTime;
	var enTime=interval.data[0].endTime;
	//y might change in the lifetime of the graph, keep the original to filter.
	var yPos=interval.data[0].y;//Original;
	var dataToReturn = {data:[], maxY2:0};

	//traverse extraData and filter irrelevant data...
	for (let k=0; k<extraData.length;k++) {
		if((extraData[k].starttime>=stTime) && (extraData[k].endtime<=enTime) && (extraData[k].y==yPos) )
		{
			dataToReturn.data.push(extraData[k]);
			if(extraData[k].y2>dataToReturn.maxY2)
			{
				dataToReturn.maxY2 = extraData[k].y2;
			}
		}
	}
//remember maxY for each, to allow different nr of subprocesses for each process
//disable in case nr is common, and use member property maxY2 in the component
	for (let k=0; k<dataToReturn.data.length;k++)
	{
		dataToReturn.data[k].maxY2 = dataToReturn.maxY2;
	}

	return dataToReturn;
});



}



