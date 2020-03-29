import React from 'react';
import ReactDOM from 'react-dom';
import ClusterSurvey from './ClusterSurvey';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ClusterSurvey />, div);
    ReactDOM.unmountComponentAtNode(div);
});
