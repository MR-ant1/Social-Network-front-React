# SOCIAL NETWORK FRONT

![alt text](img/READMEHeadPic.jpg)

### TARGET :dart:
The target of this proyect is to recreate a social network frontend where users can interact between them and add posts to see by everybody.

### INDEX :open_file_folder: 
- [SOCIAL NETWORK FRONT](#social-network-front)
    - [TARGET :dart:](#target-dart)
    - [INDEX :open\_file\_folder:](#index-open_file_folder)
    - [STACK :wrench:](#stack-wrench)
    - [ABOUT APP :blue\_book:](#about-app-blue_book)
    - [DB diagram :clipboard:](#db-diagram-clipboard)
    - [HOW TO DOWNLOAD AND RUN IT :mag:](#how-to-download-and-run-it-mag)
    - [FRONT DESIGN :computer:](#front-design-computer)
    - [AUTHOR :pencil2:](#author-pencil2)
    - [POSSIBLE IMPROVEMENTS :heavy\_check\_mark:](#possible-improvements-heavy_check_mark)
    - [ACKNOWLEDGEMENTS :raised\_hands:](#acknowledgements-raised_hands)

### STACK :wrench:
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="NODE.JS" />![alt text](image.png)
<img src="https://camo.githubusercontent.com/6c3957842901e5baa389f3bb8758c8966683333b28493013062fcab5fab645e7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642" alt="React"><img src="https://img.shields.io/badge/DOCKER-2020BF?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/><img src="https://camo.githubusercontent.com/0f98e0edc3ae47a19fac8a8679ba0a4f678ed9872c18771cb53f493b21ddaf90/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a61766173636970742d4546443831443f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b" alt="Javascript"/><img src="https://camo.githubusercontent.com/aac74ca85b21ed1ff4fa88dda8712fce9cddbf786bdf807231e6179f70003ac5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a57542d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f3d4a534f4e253230776562253230746f6b656e73" alt="JWT">


### ABOUT APP :blue_book:

This Front-end proyect allows to create and to log in a user to interact with POSS IT! different functions. You will interact in many ways:

- Registering and log in your new user before to see posts from other users or send one yourself from your account.
- Consult all posts from most recent to older from the rest of users.
- Check your own posts or update your account personal data in profile section.
- Creation of new posts where you add a title and an explanation for your idea or story.
- Check, edit and delete your own posts.
- See any post in detail and edit your own posts content in profile.
- share likes or remove them from any post.
- Consulting all existent users and posts data (super_admin)


### DB diagram :clipboard:

![alt text](img/DBdiagram.png)

### HOW TO DOWNLOAD AND RUN IT :mag: 

Here you can find the link to THIS REPOSITORY:

- https://github.com/MR-ant1/Social-Network-front-React.git

and down here, the link to the backend repository and its README explaining how it works:

- https://github.com/MR-ant1/API-Backend-rrss.git


Follow the next steps to prepare the APP's environment and make it work correctly:

<details>
<summary>INSTRUCTIONS</summary>

 1. First install Visual Studio Code, Docker desktop and AtlasDB. Here  
   I leave the links to download each of them:
- <a href=https://code.visualstudio.com/ > Visual studio Code</a> 
- <a href=https://www.docker.com/products/docker-desktop/ > Docker</a>
- <a href=https://downloads.mysql.com/archives/workbench/ > AtlasDB</a>
  
2. Go to windows PowerShell and download an image of MySql with command:
``` bash
docker pull mongo
``` 

and then type this command to open a new container to our backend:

``` bash
docker run -d -p 27017:27017 --name mongo -v mongo_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:latest
```

3. In docker desktop, start the container that will appear in main view by pressing play button.

4. Create a folder to the proyect, open it and execute this command in console:
``` bash
git init
```
Once we do it, Clone the repository with the command "git clone https://github.com/MR-ant1/API-Backend-rrss.git

Make same steps with another folder and clone the front repository with this link and same command: "git clone https://github.com/MR-ant1/Social-Network-front-React.git

5. Execute in terminal, in order of appaerance, the next commands in both proyects:
``` bash
npm init --y
```
``` bash
npm install
```

6. Go to the altasDB web and create a container to locate the backend data. Only introduce the link the web will provide you to fill in the MONGO URI link in the next step.

7. Create file ".env" in api backend rrss. Use sample incluided with references needed to introduce our container data and be able to run server and database.

``` bash

PORT=4001

MONGO_URI=mongodb://root:root@127.0.0.1:27017/test?authSource=admin

JWT_SECRET=SECRET
```


8. Execute seeders through command:
``` bash
npm run seed
```

With this, we'll adding our data to the Database, so we can check all data in workbrench
9.  Run the server with command:
``` bash
npm run dev
```
10.    After all this, we will have to run this same commands in the front proyect to install dependencies:
``` bash
npm i
```
``` bash
npm run dev
```
11.  The password for any user in DB is aA123456. User email is for standard user and the other is for admin account:
```bash
user@user.com
superadmin@superadmin.com
```

</details>

### FRONT DESIGN :computer:

First of all, we created the react proyect with command "npm create vite@latest and filled the main file to allow our app work.

![alt text](img/MainScreenShot.png)

BrowserRouter is imported and added in main to allow app navigate between all pages that we created later.

Added Provider and PersitGate to allow redux store data.

Then, a variable "app" in file app.js was created to be linked with express, to allow the server work properly.

![alt text](img/AppScreenShot.png)

"app" will contain the main sections in our screen, Body and Header. This file will control the web display and will make possible to add properties and designs to both sections later.

Once we have our app file created, we add "Body" and "Header" files to define what this sections will have to show. First its Body file, which doesn't contains design data and only have the different routes from each page to navigate. So we find that body acts like a router that will show a view depending of the route we have on our url.

![alt text](img/BodyScreenShot.png)

You can see in the image all the different views that this front can show and its routes to navigate. Note that the first Route is introduced to relocate any other route not described in this file to home page with route "/".

Then, header is created. This section will show always in our web to allow moving to all sections.

![alt text](img/HeaderScreenShot.png)

In this photo from the first part of header, we can see how tokenData is brought to allow show one from two possibles header and how logOut function is defined to make this button delete token and get out of a logged user. We also can see the header display for the cases where user owns a tokenData from login before. In this case, all user sections will show in header(profile with user name, myAppointments, logOut and, if user is super_admin, "admin area" section to see all posts and users)

![alt text](img/HeaderScreenshot2.png)

in this other picture, we can see what happens if user doesn't own a token, when what user will se is home, login and register sections.
Home page is at the begin of return and out of conditions because will be showed always no matter if user owns a token or not.

To make the body routes work, we'll need BrowserRoutes we definded before and the Navigator file which contains the logic to change a page depending of the new page selected's "sendTo" instruccion

![alt text](img/NavigatorScreenShot.png)

This allows to invoque navigate variable that sends to the route we give inside ("/")

Once we have the main structure of our web done, we add css designs to all this previous components from the page to make possible to evaluate if it works correctly

The remaining work consist on implement pages and logic to make them work. I will describe each of them next.

<details>
<summary>PAGES</summary>

---------------------------------------------

<details>
<summary>REGISTER</summary>

![alt text](img/RegisterLogic.png)

![alt text](img/RegisterView.png)

In register page, we create a function where first all user, error and action functions are defined, and then in the return, 4 inputs and a custom button are throwed.

![alt text](img/RegisterReturn.png)

InputHandler function make the inputs able to dinamicly change while someone types in each key value from user object. Same use from InputHandler is given to check any error when we go outside the field. Both functions are defined in our CIunput model:

![alt text](img/CInputScreenshot.png)

There are some different inputs for other views, but all works in the same way.

OnChangeFunction holds the typing change functionality and onBlurFunction, the event of check error when leaving each field.

Finally, the CButton contains "registration" function, making it run when we click in this component.

![alt text](img/CButtonScreenShot.png)

Like its done in CInput, the props are given to the button to allow introduce registration function and add some design.

-------------------------------------------

</details>

<details>
<summary>LOGIN</summary>

Login use a similar structure with a function that contains user data in an object to send to backend four fields with the same structure we prepared in there. InputHandler function and checkerror are included too for fields email and password from user.

USE THE PASSWORD aA123456 FOR ALL USERS IN DB

![alt text](img/LoginLogic.png)

![alt text](img/LoginView.png)

Same hooks and consts alike in Register are declared, and then inputhandler and checkerror for inputs.

The loginMe function sends to api.calls file the data introduced in inputs (after each field passes its checkError function), and there, LoginUser makes the conection with backend and send JSON data.

Then, if accessData is correct, backend response contains the token info that is saved into our tokenData variable in localstorage. That is how we will be able to get user,s name, id and role in other pages.

![alt text](img/LoginCall.png)

In api.calls, the function LoginUser defines a clientData variable with the required formatted data needed our backend's client. (in this case method, headers and body with inputs data from register page).

With al this functionality, Login throws two fields and a register me button, with same structure that in register.

![alt text](img/LoginReturn.png)

-----------------------------------------

</details>

<details>
<summary>PROFILE</summary>

![alt text](img/ProfileLogic.png)

![alt text](img/ProfileView.png)

Profile page works similar to login and register page throwing 3 inputs with user info bringed from database with useEffect function when page loads. The main difference is the new function Upload which sends new data typed in inputs like other ones but using a PUT method to upload values in DB.
Email field is not editable so a disabled prop were addded to not allow this action.
In the other half of the screen, post from your user appears and you can edit them or remove one by one.

-----------------------------------------

</details>

<details>
<summary>HOME</summary>

![alt text](img/HomeLogic.png)

![alt text](img/HomeView.png)

![alt text](img/HomeTokenView.png)

This page acts as the land page were user first access, and as a feed for write new posts and read the rest. If user is not logged, the view will se the first one and any act can be done excepting login and register.

Home function first part is different and doesn't need inputHandler function. We add a useEffect to run the GET services data function when loading page. getServices works almost like previous login and register functions sending data to api.calls and then to backend.

The main difference in this and other pages, is that return doesnt throw inputs. This time services Data is defined up as an empty array, and a map method is in return iterating a card for each object bringed by database with keys defined in card component previously defined in its own file:

![alt text](img/PostLogic.png)

Also each card can be liked by clicking on heart icon or ridden in detail view by clicking in card itself.

The box up in the feed is where we can create a new post with a title and a description.

-----------------------------------------

</details>

<details>
<summary>DETAIL VIEWS</summary>

In home view and profile too, you can click in cards and go to their detail page. There you'll be able to see full info from any post and, in case of profile own post, edit them. 

![alt text](img/DetailLogic.png)

![alt text](img/DetailView.png)

![alt text](img/EditDetailView.png)

---------------------------------------------------

</details>


<details>
<summary>SUPER ADMIN</summary>

It works like feed with a map iterating cards, but this time all users and posts are bringed from DB and only super_admin (access controled at beginning of function) can access.

![alt text](img/SuperAdminLogic.png)

![alt text](img/SuperAdminView.png)

---------------------------------------------------

</details>

</details>

###  AUTHOR :pencil2:
- Antonio Rodrigo - Full Stack Developer student

- <a href="https://github.com/MR-ant1">GitHub - <a>Linkedin</a>

### POSSIBLE IMPROVEMENTS :heavy_check_mark: 

- Token expiration fix. When token ends, leave page broken and cant log in neither log out and delete it
- Web should be responsive, but in this academic proyect the main target is to make pages and components work.
- When any user update his firstName, value in profile's header section should update too, but at the moment is necessary to logout and login again to see this componen updated.
- Some div movement in home welcome message when buttons grow up on blur. Should be static.
- A follow users function should be included in near future.
- There's an intention of include the possibility to leave comments on each post.

### ACKNOWLEDGEMENTS :raised_hands:
Big shout out like always to the GeeksHubs team for giving me the change of learning in this wonderful world of developping! 

[def]: #Acknowledgements-

:arrow_up: [TABLE OF CONTENTS](#TABLE_OF_CONTENTS-open_file_folder)