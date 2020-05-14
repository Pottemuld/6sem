import React from 'react';
import { Link } from 'react-router-dom';



function NotFound() {
    return (
        <div>
            <h3>Whoops, it seems we can't find that page!</h3>
            <p className="misc-p">But you can <Link to="/">click here</Link> to go to our homepage instead :)</p>
        </div>
    );
}

export default NotFound;