import React, {useState, useEffect} from 'react';
import './ClusterQuestions.css'
import parse from 'html-react-parser';


const ClusterQuestions = (props) => {

    const clusterQuestions = props.data.map(cluster => {  
        // console.log(cluster.clusterName);
		// console.log(cluster.description);
		
		var opts = {};
		opts['data-src'] = "holder.js/100px225?size=20&theme=thumb&bg=42cd42&fg=f8f8ff&text=" + cluster.clusterName;
		
		var clusterId = cluster.id;
		var clusterQuestions = cluster.clusterQuestions;
		var questionIndex = 0;		
		var divQuestionsWithAnswers = "";	
		
		clusterQuestions.map(clusterQuestion => {
			var answers = clusterQuestion.answers;
			var answerIndex = 0;
			var divAnswers = "";			
			var checkboxId = "";			
			
			questionIndex += 1;		
			divQuestionsWithAnswers += "<tr><td>"
			divQuestionsWithAnswers += "<b>" + clusterQuestion.question + "</b><br />";
						
			answers.map(answer => {
					answerIndex += 1;
					checkboxId = clusterId + "_" + questionIndex + "_" + answerIndex;
					divAnswers += "<input type='checkbox' name='cluster" + clusterId + "[]" + "' id='" + checkboxId + "'>";
					divAnswers += "<label for='" + checkboxId + "'>" + answer + "</label><br />";					
			});
			
			divQuestionsWithAnswers += divAnswers;			
			divQuestionsWithAnswers += "</td></tr>";		
		});
		
		
        return (    
			<table>
				<tr><td class='spacer'>&nbsp;</td></tr>
				<tr>
					<th>
						BOX {cluster.id}
						{parse("<input type='hidden' name='hidden_" + clusterId + "' value='" + cluster.clusterName + "'>")}
					</th>
				</tr>	
				{parse(divQuestionsWithAnswers)}						
			</table>
        );            
    });

    return <div>{clusterQuestions}</div>;
};

export default ClusterQuestions;


