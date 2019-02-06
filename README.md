# Front-End-Development-for-Multi-Party-Computation-in-the-Cloud

## Project Description

The project is closely related to ChRIS. In some ways, the project is the front end of ChRIS platform. ChRIS is an open source framework that utilizes cloud technologies to democratize medical analytics application development and enables healthcare organizations to keep owning their data while benefiting from public cloud processing capabilities.  The ChRIS UI is a platform to enable ChRIS researchers to be able to easily access and use the latest image processing technology as well as the power and speed of cloud computing in exploring and making discoveries in medical imaging data. Enabling collaboration and sharing between researchers is an important secondary goal.

The project is based on the previous backend API -- [ChRIS API](https://fnndsc.github.io/fnndsc/chrisdoc/), our main work is to rewrite the data store/global state of UI so the components can have access to the data by using [React](https://github.com/facebook/react) and [Redux](https://github.com/reduxjs/redux), a big component of the MPC for this front end is taking the results of the MPC and visualizing for the user so they can consume the data.


## 1. Vision and Goals

* Set up react scaffolding using [create-react-app](https://github.com/facebook/create-react-app) and get familiar with redux.
* (Crucial work!)Set up [ChRIS store UI](https://github.com/FNNDSC/ChRIS_store_ui) by using redux and then look at replacing [undux](https://github.com/bcherny/undux) with redux in chris store UI, which is a light version of redux.
* Get the data from the multi-party compute and create a component that diplays the output from the MPC API so that there is something pleasant the user can view from the results of the algorithm.(But the order should be redux first then MPC second since the MPC integration won’t be ready for a little while)

## 2. Scope and Features
Basically, the scope of project or in other word the users of service targets at:  
* Medical/neuroscience researchers focusing on the analysis of brain imagery.  

Specifically targets at:  
* researchers interested in comparing the volumes of specific brain structures across different groups of patients at different medical institutions.  
What will not be covered are doctors treating specific patients who are patient-focused.  

**Someone else that can benefit from this service**  
The entire platform is generalizable to any kind of image processing, it doesn't even have to be medical images. For example, different animation studios working together, some using proprietary computations they dont want to reveal but they need to contribute the results to a common pool and to create a final animation.  

**Administrators versus end users want**
* The end user want to be able to easily submit their processing job, and get an answer back quickly in a format they can understand, that's where the stretch goal of visualization for the standard deviation graph can come in.
* The end users also want to be able to share data with colleagues at other medical institutions, to be able to discover information to help treat conditions they're studying.
* The administrators on each institution site want to remain in compliance with laws, particularly regarding the sharing of patient data. they'd like to enable sharing to help the researchers make new discoveries, but also comply with laws and maintain patient privacy.
* The administrators also want - probably - the processing to happen efficiently and not gobble up too many resources / hog the system / cost too much processing time / power / money  

**Features of the project**
* Performance: This project really cares about performance and speed of the data processing, which is a main concern for the project.
* Extensibility: Provides an extendable interface that allows third-party service plugin.
* Security: The data which is passed into system from one institution cannot be accessed by another institution.

## 3. Solution Concept

### Global Architectural Structure Of the Project:
<img align = center src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/diagram.png">
Source: ChRIS UI Design Brief. RedHat, 20 Nov. 2018.

### Some concepts about the project in the diagram:
- **Plugin:** A containerized set of image processing software that can be applied to image data input into the plugin in order to manipulate it. Plugin includes input and output.
- **Pipeline:** A pipeline is a template that can be used to process data.
- **Feed:** A feed is a specific run of a pipeline.
- **Data:** Data is the actual data that feeds operate on / manipulate.
- **Project:** A composition of feeds and maybe ACLs and metadata (notes, chats, labels, etc.) for collaboration.

### Design Implications and Discussion
Key design decisions and motivation behind them:  
- Improve data performace by Redux: One of the major assignment for our project is to improving data speed and preformance by using Redux. ChRIS has the processing that happens on the cloud nodes, and that has to be presented to the user looking at the interface in an efficient way so the front end isn't copying the same data over and over or making wasteful calls to the backend that take up time / resources and give a very slow user experience of the front end. So when we use React to build our frontend, Redux has a mechanism that allows you to cache the data in the front end in a ‘store’, so in this way by caching data in redux, we can improve our data performance.
- Look at replacing undux with redux:
|  | __Redux__ | __Undux__ |
|-----|-----|-----|
| Speed | Globs of boilerplate which slows down engineering | Near-zero boilerplate which enables rapid iteration |
| Trace the code | Actions, creators, types, reducers, callers spread all across lots of files | Do every thing right in your view |


### A brief flow diagram to show how the front-end works:
<img align = center src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/Project-Based%20Feed%20Screen-By-Sreen.png">
Source: ChRIS UI Design Brief. RedHat, 20 Nov. 2018.

## 4. Acceptance criteria
Minimum acceptance criteria is:
- Design an efficient front-end interface to interact between users and cloud server.
- Understand the multiparty computation structure, optimize the front end to help users search data faster
Potential stretch goals are:  
- visualization of brain volume results.

## 5. Release Planning
(This is just a temporary plan, will be modified depending on the progress...)

- Sprint 1(weeks 2&3): get familiar with project technology, including React, Patternfly, Redux, Undux and so on. And have a basic understanding about the ChRIS platform and ChRIS UI project of redhat.

- Sprint 2(weeks 4&5): start the redux implementation in ChRIS Store, rewrite the frame by using Redux and fetch all the data object into the caches.

- Sprint 3(weeks 6&7): start implementing redux for the ChRIS UI, take all backend objects and populate them into the cache and make them available.

- Sprint 4(weeks 8&9): creating some unit for testing and ensuring redux can work correctly 

- Sprint 5(from week9): building new front end component for visualization of brain volume calculation.

## 6. Division of Work
to be decided

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
