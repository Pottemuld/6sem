import React from 'react';

function Help() {
    const style = { "text-align": "center" };

    return(
        <div>
            <h3>
                Unfortunately, this page is not supported during this stage of development!
            </h3>
            <p className="misc-p">
                It might contain things like a phone number or email for support in the future.
            </p>
        </div>
    );
}

export default Help;