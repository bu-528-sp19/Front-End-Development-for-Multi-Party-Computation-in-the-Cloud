# Fron-End Development for Multi-Party-Computation in the Cloud

## Installation

### Install ChRIS Store Frontend
- To install the ChRIS Store, run the following commands in terminal:
```bash
$ git clone https://github.com/FNNDSC/ChRIS_store_ui
$ cd ChRIS_store_ui
$ yarn install
$ yarn build
$ yarn serve
```
- You can now access the ChRIS Store frontend in http://localhost:3000/

### Deploy ChRIS Store Frontend
- To deploy the frontend of ChRIS Store, Login to the MOC Openshift Dashboard.
- Create a Node.js project.
- Choose the project you want to add and give a name to the application.
- For the Git Repository, input `https://github.com/FNNDSC/ChRIS_store_ui.git`, the backend will be deployed to Openshift automatically using [S2I](https://blog.openshift.com/multiple-deployment-methods-openshift/) method.

### Install ChRIS UI
- To install the ChRIS Store, run the following commands in terminal:

```
$ git clone https://github.com/FNNDSC/ChRIS_ui.git
$ cd ChRIS_ui
$ npm install
$ npm start
```
- You can now access the ChRIS Store frontend in http://localhost:3000/

### Deploy ChRIS Store backend
- To deploy the backend of ChRIS Store, Login to the MOC Openshift Dashboard.
- Create a Node.js project.
- Choose the project you want to add and give a name to the application.
- For the Git Repository, input `https://github.com/FNNDSC/ChRIS_ultron_backEnd`, the backend will be deployed to Openshift automatically using [S2I](https://blog.openshift.com/multiple-deployment-methods-openshift/) method.

## Project Code
- Our code are pulled to the ChRIS main branch directly, to see the code:

  - For sprint 1, we rewrite ChRIS_Store_UI using redux and delete some redundant units. 
    - The pull request is [here](https://github.com/FNNDSC/ChRIS_store_ui/pull/49/files)
  - For sprint 2, we write the ChRIS's type declaration using TypeScript.
    - The pull request is [here](https://github.com/rebecabkerr/ChRIS_ui/pull/5/files), the source code is [here](https://github.com/rebecabkerr/ChRIS_ui/blob/master/src/types/chrisapi/index.d.ts)
  - For sprint 3, we write unit test using JEST to test ChRIS's API, action, and reducer.
    - The pull request is [here](https://github.com/FNNDSC/ChRIS_ui/pull/10/files), the source code is [here](https://github.com/FNNDSC/ChRIS_ui/tree/master/src/__tests__/store)
  - For Sprint 4, we fixed and optimized unit test scripts and deployed the Chris Store frontend to the MOC using Openshift S2I
    - The pull request is [here](https://github.com/FNNDSC/ChRIS_ui/pull/20), and [here](https://github.com/FNNDSC/ChRIS_ui/pull/21)
    - The deployed webpage is [here](http://chris-store-demo-bu528-ui-for-cloud-mpc.k-apps.osh.massopen.cloud/plugins)(Please use Safari, FireFox or Edge to access the webpage, the website doesn't support Chrome)
  - For Sprint 5 
    - Deploy the backend of Chris Store to MOC by using Openshift
    - Monitor the traffic of website using Jmeter, do the pressure test
    - The deployed webpage is [here](http://chris-store-dev-chrisstorebackend.k-apps.osh.massopen.cloud/api/v1/)(Please use Safari, FireFox or Edge to access the webpage, the website doesn't support Chrome)
    
## Project Introduction
    
### 1. Vision and Goals

The project is part of the front end of ChRIS platform which have a team group of nealy 200 people(ChRIS Research Integration System, which is a web-based medical image platform that allows for various forms of medical image processing(Ex: MRIs).   
ChRIS platform is:  
- Open source
- A medical image processing platform
- Deployed on the Massachusetts Open Cloud (MOC)  

Our goal is to: 
- Design a front-end interface using React & Redux.
- Conduct unit test about ChRIS API.
- Deploy ChRIS store backend and frontend to MOC using Openshift.
- Explore the performance of ChRIS store website in MOC.

### 2. Users/Personas Of The Project
Basically, the target users are:  
* Medical/neuroscience researchers focusing on the analysis of brain imaging.  
* Specifically targets are researchers interested in comparing the volumes of specific brain structures across different groups of patients at different medical institutions. 

Someone else that can benefit from this service:
* The entire platform is generalizable to any kind of image processing, it doesn't even have to be medical images. For example, different animation studios working together, some using proprietary computations they don't want to reveal but they need to contribute the results to a common pool and to create a final animation.  

Non-professional users or users without the requirement of computation speed are not the targets of ChRIS

Administrators versus end users want
* The end user wants to be able to easily submit their processing job, and get the result back quickly in a format they can understand, that's where the stretch goal of visualization for the standard deviation graph can come in.
* The end users also want to be able to communicate with colleagues at other medical institutions, to be able to discover information to help treat conditions they're studying.
* The administrators on each institution site want to remain in compliance with laws, particularly regarding the sharing of patient data. They'd like to enable sharing to help the researchers make new discoveries, but also comply with laws and maintain patient privacy.
* The administrators also want - probably - the processing to happen efficiently and not gobble up too many resources / hog the system/cost too much processing time/power/money  

### 3. Scope and Features
The front-end will deliver:
* Privacy: Each user has their unique credentials.
* Performance improvement: The ChRIS will be dealing with a lot of data, so the data should be fetched as few as possible but enough so that the user isn’t hindered by showing data that is stale.
* Extensibility: Provides an extendable interface that allows third-party service plugin.
* Security: The data which is passed into systems from one institution cannot be accessed by another institution.

The front-end will not deliver:
* Image processing functions are provided by the ChRIS APIs, not the front end module.
* The MPC is not included in the front end. Instead, the front end will call the MPC API directly.

### 4. Solution Concept

### ChRIS Detail Diagram:

<div align = center><img src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/CHRIS.jpg" height = "400" width = "700"></div>

This diagram gives a brief overview of the ChRIS platform.
* While ChRIS processing tasks, the input data and plugins are retrieved by ChRIS platform from a data source and a plugin store respectively and then pushed to a cloud-based computing environment. Once the computation is finished, the output of the image processing plugin is retrieved back into ChRIS.
* Our main work is related to the ChRIS(the green square below store) frontend, which we are going to rewrite with React and Redux and test ChRIS APIs in Redux.
* Then we will deploy ChRIS store backend and frontend in MOC using Openshift.
* The ChRIS Store is an autonomous unit includes both front-end and back-end. 
* More work needed to be added... 

### Design Implications and Discussion
Key design decisions and motivation behind them:  
- Improve data performance by Redux:  
One of the major assignment for our project is to improving data speed and performance by using Redux. ChRIS has the processing that happens on the cloud nodes, and it has to be presented to the user looking at the interface in an efficient way, so the front end isn't copying the same data over and over or making wasteful calls to the backend that take up time / resources and give a very slow user experience of the front end. So when we use React to build our frontend, Redux has a mechanism that allows you to cache the data in the front end in a ‘store’, and we want to deal with a large amount of data with fewer but enough fetches to make sure the user isn't hindered by showing data, so in this way by caching data in redux, we can improve our data performance.  
Below is the React component structure without Redux and with Redux
<div align = center><img src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/redux.png" height = "400"></div>

- Redux component and workflow:  
The main component in Redux is store, action creator and reducer. We are also highly considerly using middlewares(between the framework receiving a request, and the framework generating a response, provides a third-party extension point between dispatching an action, and the moment it reaches the reducer)like [Redux-thunk](https://github.com/reduxjs/redux-thunk) or [Redux-soga](https://github.com/redux-saga/redux-saga) to realize asynchronous API calls, like AJAX calls to communicate with backend.   So if we use the Redux to implement and connect the MOC, it will be much more efficient by connecting the UI and MOC with a store to control all the functional component and make it easier when we want to modify the component.It's time-saving for not only the time for UI itself but also for our own implementing.

<div align = center><img src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/redux.gif" height="300"></div>

- Typescript declaration file  
  * JavaScript is not able to fulfill the requirement of object-oriented programming, Typescript is much more object-oriented language 
  * We want to migrate from Javascript to Typescript to fulfill the goal of type-safe action. 
  * Create some declaration files in our source code to fulfill our goal.
- Jest  
  * Jest is the Javascript test framework we used in our test. 
  * We using Jest to test our Redux code which includes actions and reducers. 
  * In detail, we test the ChRIS API in actions and reducers in order to make sure that ChRIS API works properly.
- Apache JMeter   
Apache JMeter is a open source software to designed to load test functional behavior and measure performance. It can:  
  * Test Static and dynamic resources
  * Test Web dynamic applications
  * Simulate a heavy load to analyze website performance under different load types
  * Track the Response time, throughput of the request test
We use Apache JMeter to test our ChRIS store which is deployed in MOC related to performance and response time. We also try to test ChRIS store performance by creating different numbers of plugins. 
- Deployment to MOC
  * Frontend: our frontend was built through nodejs, so we build a nodejs application in the cource project. By giving the github source of our frontend, the openshift will package the application into docker image through S2i process. And we need to define and specify the dependencies and port of the app to connect it to the MOC, and point the frontend to the backend of Chris Store.
  * Backend: our backend is a Python app. So we need to build 3 basic file for openshift deployment: requirement.txt, manage.py, wisg.py. And because of the application need to use "mkdir", so we need to build an account to have the SCC to get the permission of building folders.

### 5. Acceptance criteria
Minimum Viable Product:
- Update the Chris-store UI by replacing the Undux with Redux.
- Design an efficient front-end interface of Chris to interact between users and cloud server by using Redux. 
- Using Jest to test Redux action and reducer which related to ChRIS API.
- Deploy ChRIS store frontend to MOC using Openshift.

Potential stretch goals:  
- Deploy the ChRIS Store backend to MOC.
- Implement Apache JMeter to track the website traffic and do some pressure test.
- Compared ChRIS store performance by adding different numbers of plugins.

### 6. Workflow of our project
<div align = center><img src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/workflow1.jpg" height = "400" width = "700"></div>

What we did about ChRIS store is that:
- Rewrite ChRIS store using React and Redux
- Deploy into MOC using Openshift
- Conduct pressure test using Apache JMeter

<div align = center><img src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/workflow2.jpg" height = "400" width = "700"></div>

What we did in about ChRIS is that:
- Create declaration files for 33 ChRIS APIs
- Conduct API test in Redux

### 7. Release Planning

Until February 6 2019, the MPC API hasn't been implemented yet. Based on the schedule, the MPC API can be released after we finished the ChRIS Store rewriting and front-end of ChRIS platform. The data visualization is an important part of user experience, we want to show something pleasant the user can view from the results of the algorithm. 

- Sprint 1(weeks 1&3): Get familiar with project technology, including React, Patternfly, Redux, Undux and so on. And have a basic understanding of the ChRIS platform and ChRIS UI project of Redhat. Practice how to implement Redux by updating the Chris-store UI by using Redux. 

- Sprint 2(weeks 4&6): Start implementing redux for the ChRIS UI, create a definition file of Typescript for ChRIS API, start to test the backend of ChRIS UI and take all backend objects and populate them into the cache and make them available.

- Sprint 3(weeks 7&8): Conducting some unit test using jest on ChRIS API to ensure that redux and whole project can work correctly.

- Sprint 4(weeks 9&10): Deploy the ChRIS Store on the MOC using Openshift and incorporate testing to validate functionality.

- Sprint 5(from week11): Deploy the backend of ChRIS Store and track and test the website traffic using Apache JMeter.


#### Reference
- [1] Duffy, Máirín. ChRIS UI Design Brief. RedHat, 20 Nov. 2018.
- [2] Duffy, Mairin. “Boston University Red Hat Collaboratory.” Family and Medical Leave Act (FMLA) | Human Resources, BU Research, 19 June 2018, www.bu.edu/rhcollab/2018/06/19/chris-at-the-red-hat-summit/.
- [3] Fnndsc. “FNNDSC/ChRIS_store.” [GitHub](https://github.com/FNNDSC/ChRIS_store), 14 Dec. 2018.
- [4] Fnndsc. “FNNDSC/ChRIS_ultron_backEnd.” [GitHub](github.com/FNNDSC/ChRIS_ultron_backEnd/wiki/ChRIS-REST-API-design).

#### Our mentors
- Joseph Caiani
- Máirín Duffy

#### Contact us

- Qingxing Li lqx1996@bu.edu
- Yicun Hou yicunhou@bu.edu
- Haoyu Xu xhy@bu.edu

