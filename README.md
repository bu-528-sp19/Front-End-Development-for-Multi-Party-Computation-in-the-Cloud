# Front-End-Development-for-Multi-Party-Computation-in-the-Cloud

## Project Description

The project is the front end of ChRIS platform(ChRIS Research Integration System, is a web-based medical image platform that allows for various forms of medical image(Ex: MRIs) processing). The Chris front end is not only a simple front end project, it is a bridge to communicate between ChRIS user, ChRIS Store and Multi-Party-Computation(MPC) API. This project enables users who is not familar with image processing able to process the medical image with a single click. Also, with the power of MPC, the users can get the image processing result in a few second.

## 1. Vision and Goals
The goal of this project can be summarized as three parts:
* Rewrite ChRIS store using Redux. Right now, the ChRIS store is built by Undux and we gonna re-write it using Redux which is more popular.
* Built a frond end for the ChRIS platform using React and Redux.
* Create a component to visualize the Data from MPC. Until February 6 2019, the MPC API haven't been implemented yet. Based on the schedule, the MPC API can be released after we finished the ChRIS Store rewriting and front-end of ChRIS platform. The data visualization is an important part of user experience, we want to show something pleasant the user can view from the results of the algorithm.

## 2. Scope and Features
Basically, the scope of the project or in other words the target users are:  
* Medical/neuroscience researchers focusing on the analysis of brain imagery.  

Specifically targets at:  
* Researchers interested in comparing the volumes of specific brain structures across different groups of patients at different medical institutions.

What will not be covered are:  
* Doctors treating specific patients who are patient-focused.  

**Someone else that can benefit from this service**  
The entire platform is generalizable to any kind of image processing, it doesn't even have to be medical images. For example, different animation studios working together, some using proprietary computations they don't want to reveal but they need to contribute the results to a common pool and to create a final animation.  

**Administrators versus end users want**
* The end user wants to be able to easily submit their processing job, and get an answer back quickly in a format they can understand, that's where the stretch goal of visualization for the standard deviation graph can come in.
* The end users also want to be able to share data with colleagues at other medical institutions, to be able to discover information to help treat conditions they're studying.
* The administrators on each institution site want to remain in compliance with laws, particularly regarding the sharing of patient data. they'd like to enable sharing to help the researchers make new discoveries, but also comply with laws and maintain patient privacy.
* The administrators also want - probably - the processing to happen efficiently and not gobble up too many resources / hog the system / cost too much processing time / power / money  

**Features of the project**
* Performance: This project really cares about performance and speed of the data processing, which is a main concern for the project.
* Extensibility: Provides an extendable interface that allows third-party service plugin.
* Security: The data which is passed into systems from one institution cannot be accessed by another institution.

## 3. Solution Concept
* Set up react scaffolding using [create-react-app](https://github.com/facebook/create-react-app) and get familiar with redux.
* (Crucial work!)Set up [ChRIS store UI](https://github.com/FNNDSC/ChRIS_store_ui) by using redux and then look at replacing [undux](https://github.com/bcherny/undux) with redux in chris store UI, which is a light version of redux.
* (But the order should be redux first then MPC second since the MPC integration won’t be ready for a little while)
### ChRIS Detail Diagram:
<img align = center src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/chris-detail.png">

* This diagram explains how input data and plugins are retrieved by ChRIS from a data source and a plugin store respectively and then pushed to a cloud-based compute environment. Once computation is finished, the output of the image processing plugin is retrieved back into ChRIS.
* Our main work is related to the ChRIS(the green square below store) frontend, which we are going to rewrite with React and Redux. Then we will get data from the MPC depicted on the right side through the ChRIS backend to the ChRIS front end to display the output.
* More work needed to be added... 

### Global Architectural Structure Of ChRIS:
<img align = center src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/chris-arch-os.png">

* This diagram provides a deeper dive showing how ChRIS resides within Boston Children’s Hospital, sending the data to MOC specifically to an IO handler within OpenShift. The data is then stored inside of Swift within OpenStack. This is to enable the segmentation of data between jobs. The OpenShift process manager processes the plugin container from ChRIS and launches it into a job starting with an init container that pulls the data out of Swift and makes it available for the image plugin container, which passes its result to a publish container that passes the data to Swift, and the IO Handler passes the output data back to ChRIS.

### Design Implications and Discussion
Key design decisions and motivation behind them:  
- Improve data performance by Redux: One of the major assignment for our project is to improving data speed and performance by using Redux. ChRIS has the processing that happens on the cloud nodes, and that has to be presented to the user looking at the interface in an efficient way so the front end isn't copying the same data over and over or making wasteful calls to the backend that take up time / resources and give a very slow user experience of the front end. So when we use React to build our frontend, Redux has a mechanism that allows you to cache the data in the front end in a ‘store’, and we want to deal with large amount of data with fewer but enough fetches to make sure the user isn't hindered by showing data, so in this way by caching data in redux, we can improve our data performance.

- Look at replacing undux with redux:

Undux is a simple & typesafe alternative to Flux and Redux. Use it to manage state and data for ReactJS applications of all sizes. Below is the comparison between Redux and Undux.

| Tables        | Redux         | Undux |
|:-------------:|-------------|-----|
| Speed      | Globs of boilerplate which slows down engineering | Near-zero boilerplate which enables rapid iteration |
| Trace | Actions, creators, types, reducers, callers spread all across lots of files which makes its harder to trace code   |   Do everything right in your view |
| Safety | Really hard to type safely      |    100% typesafe |


### A brief flow diagram to show how the front-end works:
<img align = center src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/Project-Based%20Feed%20Screen-By-Sreen.png">
Source: ChRIS UI Design Brief. RedHat, 20 Nov. 2018.

## 4. Acceptance criteria
Minimum Viable Product are:
- Design an efficient front-end interface to interact between users and cloud server. 
- Understand the multiparty computation structure, optimize the front end to help users search data faster. 

Potential stretch goals are:  
- Get page response time down
- Visualization of brain volume results.

## 5. Release Planning
(This is just a temporary plan, will be modified depending on the progress...)

- Sprint 1(weeks 2&3): get familiar with project technology, including React, Patternfly, Redux, Undux and so on. And have a basic understanding about the ChRIS platform and ChRIS UI project of redhat.

- Sprint 2(weeks 4&5): start the redux implementation in ChRIS Store, rewrite the frame by using Redux and fetch all the data object into the caches.

- Sprint 3(weeks 6&7): start implementing redux for the ChRIS UI, take all backend objects and populate them into the cache and make them available.

- Sprint 4(weeks 8&9): create some unit for testing and ensuring redux can work correctly 

- Sprint 5(from week9): build new front end component for visualization of brain volume calculation.

## 6. Division of Work
To be decided

- Qingxing Li:
- Yicun Hou:
- Haoyu Xu:

** **

#### Reference
- “Boston University Red Hat Collaboratory.” Family and Medical Leave Act (FMLA) | Human Resources, Boston University, www.bu.edu/rhcollab/projects/radiology/.
- Duffy, Máirín. ChRIS UI Design Brief. RedHat, 20 Nov. 2018.
- Fnndsc. “FNNDSC/ChRIS_store.” GitHub, 14 Dec. 2018, github.com/FNNDSC/ChRIS_store.
- Fnndsc. “FNNDSC/ChRIS_ultron_backEnd.” GitHub, github.com/FNNDSC/ChRIS_ultron_backEnd/wiki/ChRIS-REST-API-design.
- [Undux official website](https://undux.org/)

#### Contact us

- Qingxing Li lqx1996@bu.edu
- Yicun Hou yicunhou@bu.edu
- Haoyu Xu xhy@bu.edu
