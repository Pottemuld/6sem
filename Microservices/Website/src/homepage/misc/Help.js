import React from 'react';

function Help() {
    const style = { "text-align": "center" };

    return(
        <div>
            <h3>
                Help
            </h3>
            <p className="misc-p">
                Below, you can find a list that will guide you through the basics of navigating and using the DuoSound streaming service.
            </p> <br></br>
            <ol>
                <li>On the landing page, press "create new user" to go to the registration screen</li>
                <li>Enter the desired email and password</li>
                <li>Click "Submit"</li>
                <li>A message will show up informing of any errors, or the successful account creation. In case of success, click "back to login" to return to the login page </li>
                <li>Upon returning to the landing page, enter the credentials of your user and click "submit"</li>
                <li>You are now logged in and can browse the website, including the music library, and your account settings page. (Help and about pages can be accessed without being logged in, by using the menu-dropdown.)</li>
                <li>If you browse the music library and find a song you want to listen to, simply click it to play it. A music player will appear in the navigation bar and will be visible for the rest of the time on the website, in the navigation bar</li>
                <li>To pause or resume the song, click the play/pause button. This button will be shown as either a play or a pause icon, depending on whether the application is currently playing a song</li>
                <li>To skip to another song, click the skip button and to go back to the previously playing song, click the previous button</li>
                <li>If you at any time want to return to the home page, you can do so by clicking the DuoSound logo in the navigation bar</li>
            </ol>
        </div>
    );
}

export default Help;