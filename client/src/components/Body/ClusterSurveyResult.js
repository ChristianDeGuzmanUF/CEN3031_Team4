import React, {useState, useEffect} from 'react';
import './ClusterSurveyResult.css'
import parse from 'html-react-parser';


const ClusterSurveryResult = (props) => {	

	let surveyResults = props.surveyResults;

	let clusterSurveryResult = "";	
	let cluster_top1 = surveyResults.cluster_top1;
	let cluster_top1_name = surveyResults.cluster_top1_name;
	let cluster_top2 = surveyResults.cluster_top2;
	let cluster_top2_name = surveyResults.cluster_top2_name;
	let cluster_top3 = surveyResults.cluster_top3;
	let cluster_top3_name = surveyResults.cluster_top3_name;
	
	//alert(cluster_top1);
	
	if(cluster_top1 != ""){
		clusterSurveryResult += "<br /><b>Here Are Your Top Matches</b><br />";
		clusterSurveryResult += "1: " + cluster_top1_name + "<br />";		
	}
	
	if(cluster_top2 != ""){
		clusterSurveryResult += "2: " + cluster_top2_name + "<br />";		
	}
	
	if(cluster_top3 != ""){
		clusterSurveryResult += "3: " + cluster_top3_name + "<br />";		
	}      
    
    return <div>{parse(clusterSurveryResult)}</div>;
};

export default ClusterSurveryResult;


