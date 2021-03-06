import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { submitSurvey } from "../../actions/surveyActions";
import './ClusterSurvey.css';
import ClusterQuestions from "../../components/Body/ClusterQuestions";
import ClusterSurveyResult from "../../components/Body/ClusterSurveyResult";
import data from '../../data/clusterSurvey'
import NavBar from "../../components/Body/NavBar";
import userService from "../../actions/userService";


class ClusterSurvey extends Component {
    constructor() {
        super();
        this.state = {
        	user: null,
            cluster_top1: "",
			cluster_top1_name: "",
            cluster_top2: "",
			cluster_top2_name: "",
			cluster_top3: "",
			cluster_top3_name: "",
        };
    }

    getUser = async (id) => {
        let res = await userService.getOne(id);
        this.setState({user: res});
    };

    componentDidMount() {
        if (!this.state.user || this.state.user === null) {
            this.getUser(this.props.auth.user.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
		
		let clusterAnswerCount = [];
		let top1Value;
		let top1Index;
		let top1Name;
		let top2Value;
		let top2Index;
		let top2Name;
		let top3Value;
		let top3Index;
		let top3Name;
		let clusterAnswered = 0;
		
		// initialize clusterAnswerCount
		for (let i = 0; i < 16; i++) {
			let inputName = "cluster" + (i + 1) + "[]";
			let clusterAnswers = document.querySelectorAll('input[name="' + inputName + '"]:checked');
					
			clusterAnswerCount[i] = clusterAnswers.length;		
			
			if(clusterAnswerCount[i] > 0){
				clusterAnswered += 1;
			}
		}
		
		if(clusterAnswered < 3){
			alert("Please make sure to answer at least one question from any 3 sections.");
			
			// scroll all the way up
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
			
			return;
		}
		
		//reset values
		top1Value = clusterAnswerCount[0];
		top1Index = 0;
		top2Value = clusterAnswerCount[1];
		top2Index = 1;
		top3Value = clusterAnswerCount[2];
		top3Index = 2;
				
		// find top 1
		for (let i = 0; i < clusterAnswerCount.length; i++) {
			if (clusterAnswerCount[i] > top1Value) {
				// pass former top1 to top2
				top2Value = top1Value;
				top2Index = top1Index;							
				
				top1Value = clusterAnswerCount[i];
				top1Index = i;					
			}
		}
			
		// find top 2
		for (let i = 0; i < clusterAnswerCount.length; i++) {
			// skip top 1
			if (i == top1Index){
				continue;
			}
			
			if (clusterAnswerCount[i] > top2Value) {
				// pass former top2 to top3
				top3Value = top2Value;
				top3Index = top2Index;
				
				top2Value = clusterAnswerCount[i];
				top2Index = i;				
			}
		}
		
		// find top 3
		for (let i = 0; i < clusterAnswerCount.length; i++) {
			// skip top 1
			if (i == top1Index){
				continue;
			}
			
			// skip top 2
			if (i == top2Index){
				continue;
			}	
			
			if (clusterAnswerCount[i] > top3Value) {				
				top3Value = clusterAnswerCount[i];
				top3Index = i;				
			}
		}

		//alert('top 1 value: ' + top1Value);
		//alert('top 1 index: ' + top1Index);		
		//alert('top 2 value: ' + top2Value);
		//alert('top 2 index: ' + top2Index);		
		//alert('top 3 value: ' + top3Value);
		//alert('top 3 index: ' + top3Index);

        const surveyData = {
            cluster_top1: (top1Index + 1), 
            cluster_top2: (top2Index + 1), 
			cluster_top3: (top3Index + 1) 
        };

        //this.props.submitSurvey(surveyData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
		
		top1Name = document.querySelector('input[name="hidden_' + surveyData.cluster_top1 + '"]').value;
		top2Name = document.querySelector('input[name="hidden_' + surveyData.cluster_top2 + '"]').value;
		top3Name = document.querySelector('input[name="hidden_' + surveyData.cluster_top3 + '"]').value;
		
		//alert(top1Name);
		//alert(top2Name);
		//alert(top3Name);
		
		this.setState({ cluster_top1: surveyData.cluster_top1 });
		this.setState({ cluster_top1_name: top1Name });
		this.setState({ cluster_top2: surveyData.cluster_top2 });
		this.setState({ cluster_top2_name: top2Name });
		this.setState({ cluster_top3: surveyData.cluster_top3 });
		this.setState({ cluster_top3_name: top3Name });

        const userData = {
		    topMatches: {one: top1Name.toString(), three: top2Name.toString(), two: top3Name.toString()}
		};

        userService.updateMatches(this.state.user._id, userData).then(()=>{window.location.href = "/Dashboard";})

        // scroll all the way up
		//document.body.scrollTop = 0; // For Safari
		//document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera


	};


    render() {
        const { errors } = this.state;

        return (
            <div className="main-theme">
				<NavBar/>
                <div className="survey-header">
                    Career Cluster Survey
                </div>
                <div>
                    <ClusterSurveyResult surveyResults={this.state} />
                </div>
				<div className="instructions-text">
					<h4>Instructions</h4>
					<p>For the best career matches, answer all questions below. Each section will determine how well suited you are for a particular career cluster. It is ok to leave questions blank if they do not apply to you, but you must answer one question from at least three of the sections to get matched.</p>
				</div>
				<form noValidate onSubmit={this.onSubmit} id="surveryForm">
					<div>
						<div>              
							<ClusterQuestions data={data} />              
						</div>
						<button className="large-button" type="submit">Submit</button>
					</div>				
				</form>
                <div className="credits">
                    Source <cite><a className="credit_link" href ="https://cte.careertech.org/sites/default/files/StudentInterestSurvey-English.pdf" target="_blank">Career Clusters Interest Survey</a></cite> from careertech.org
                </div>
            </div>
        );
    }
}

ClusterSurvey.propTypes = {
    submitSurvey: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { submitSurvey }
)(ClusterSurvey);