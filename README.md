<div style="height: max-content; width: 100%; display: flex; flex-flow: column nowrap; justify-content: flex-start; align-items: center; font-size: 62.5%;" align="center">
    <h1 align='center' style="font-size: 2.5em; font-weight: bold; color: rgb(110,198,255);">ScheduleIt</h1>
    <h2 style='font-size: 1.25em; font-weight: normal;'>An open-source scheduling integration aimed at helping freelancers of nearly all levels be able to schedule appointments for video chats and phone calls with potential clients.</h2>
</div>

<div style="height: max-content; width: 100%; display: flex; flex-flow: column nowrap; justify-content: flex-start; align-items: flex-start; font-size: 62.5%;" align="left">
    <h3 style='font-size: 20px; text-indent: 1rem;'>What Is ScheduleIt?</h3>
    <p style='font-size: 16px; text-indent: 1.5rem;'> As briefly stated earlier, it is a scheduling integration aimed to help freelancers schedule appointments with potential clients.</p>
    <h3 style='font-size: 20px; text-indent: 1rem;'>Why Use It?</h3>
    <p style='font-size: 16px; text-indent: 1.5rem;'> Those who use any form of JavaScript backend, including myself, likely want an open source way to help themselves to make money.  Yes, there are platforms such as Fiverr, UpWork, etc..., but how to hopefully cut out the middle man?  And, to be able to do so for free?  That is where ScheduleIt comes into play.  Since it does not conform to any specific video chat platform, or any phone network, freelancers have the freedom to choose which works best for them.</p>
    <h3 style='font-size: 20px; text-indent: 1rem;'>What Is In The Future For ScheduleIt?</h3>
    <p>
        Here it is, at least some of it.  I want this to be a platform that welcomes more than JavaScript, but that is where it will start.  I want it to work with more than MongoDB as a database, but that is where it starts.  I want to be able to more specifically set which video chat platform to use and it will provide the link for the freelancer.  Though, it starts without that.  Everything that has been great, starts small, but starts somewhere.  This is only the start.
    </p>
    <br>
    ---------------------------------------------------------------------------------------------------------------------------------------------------
    <br>
    <h3 style='font-size: 20px; text-indent: 1rem;'>Installation</h3>
    > npm i scheduleit
    Inline `code` has `back-ticks around` it.
    <!--  
        - Getting Started
            - Installation
            - Other Packages To Install
            - Setup
                - Backend
                    - First, require the 'backend' from 'scheduleit' 
                        - const backend = require('scheduleit')
                    - App / Routing File
                        - This is primarily for those who know more about full-stack development.
                        - Use the ScheduleIt route with the ScheduleIt router.  In Express it is the following:
                            - App.use(backend.scheduleItRoute, backend.router);
                    - Server File 
                        - Use backend.server.connectToDB.mongo('Your Connection String Here') in order to connect to a MongoDB database.
                        - This part of the server file is primarily for those who are newer to using the backend.
                            - Use backend.server.startServer(Your PORT Number Here) ie 8080.
                - Frontend
                    - Use import { Schedule } from 'scheduleit' to get the Schedule.
                    - Instantiate the Schedule Class as follows:
                    - const yourVariableName = new Schedule()
      -->
    
</div>
