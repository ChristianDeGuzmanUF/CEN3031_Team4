import React from 'react';

const Search = (props) => {

    return (
        <form>
            <input 
                type="text"
                placeholder="Type to Filter"
                value={props.input}
                onChange={(e) => {
                    props.setFilterText(e.target.value)
                }}
            />
        </form>
    );

};

export default Search;
