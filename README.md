# Fron-End Development for Multi-Party-Computation in the Cloud

## 1. Vision and Goals

The project is the front end of ChRIS platform(ChRIS Research Integration System, which is a web-based medical image platform that allows for various forms of medical image processing(Ex: MRIs). The ChRIS front end is not only a simple front end project, it is a bridge to communicate between ChRIS user, ChRIS Store[3] and Multi-Party-Computation(MPC) API. This project enables users who are not familar with image processing able to process the medical image with a single click. After the front end released, the whole ChRIS platform can dramatically improve the scale and efficiency of healthcare image processing applications. Nowadays, some of the image processing progress can take more than 10 hours, but ChRIS platform can reduct this to a few minutes[2]. What's more, the ChRIS platform can be developed into an ecosystem, any researcher can create and recreate their image processing tools anywhere.

## 2. Users/Personas Of The Project
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

## 3. Scope and Features
The front-end will deliver:
* Privacy: Each user has their unique credentials.
* Performance improvement: The ChRIS will be dealing with a lot of data, so the data should be fetched as few as possible but enough so that the user isn’t hindered by showing data that is stale.
* Extensibility: Provides an extendable interface that allows third-party service plugin.
* Security: The data which is passed into systems from one institution cannot be accessed by another institution.
* The multi-party-computation feature will come after February.

The front-end will not deliver:
* Image processing functions are provided by the ChRIS APIs, not the front end module.
* The MPC is not included in the front end. Instead, the front end will call the MPC API directly.

## 4. Solution Concept

### ChRIS Detail Diagram:
<img align = center src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/chris-detail.png">

This diagram gives a brief overview of the ChRIS platform.
* While ChRIS processing tasks, the input data and plugins are retrieved by ChRIS platform from a data source and a plugin store respectively and then pushed to a cloud-based computing environment. Once the computation is finished, the output of the image processing plugin is retrieved back into ChRIS.
* Our main work is related to the ChRIS(the green square below store) frontend, which we are going to rewrite with React and Redux. Then we will get data from the MPC depicted on the right side through the ChRIS backend to the ChRIS front end to display the output.
* The ChRIS Store is an autonomous unit includes both front-end and back-end. ChRIS store 
* More work needed to be added... 

### Global Architectural Structure Of ChRIS:
<img align = center src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/chris-arch-os.png">

* This diagram provides a deeper dive showing how ChRIS resides within Boston Children’s Hospital, sending the data to MOC specifically to an IO handler within OpenShift. The data is then stored inside of Swift within OpenStack. This is to enable the segmentation of data between jobs. The OpenShift process manager processes the plugin-container from ChRIS and launches it into a job starting with an init container that pulls the data out of Swift and makes it available for the image plugin container, which passes its result to a publish container that passes the data to Swift, and the IO Handler passes the output data back to ChRIS.

### Design Implications and Discussion
Key design decisions and motivation behind them:  
- Improve data performance by Redux: One of the major assignment for our project is to improving data speed and performance by using Redux. ChRIS has the processing that happens on the cloud nodes, and that has to be presented to the user looking at the interface in an efficient way so the front end isn't copying the same data over and over or making wasteful calls to the backend that take up time / resources and give a very slow user experience of the front end. So when we use React to build our frontend, Redux has a mechanism that allows you to cache the data in the front end in a ‘store’, and we want to deal with a large amount of data with fewer but enough fetches to make sure the user isn't hindered by showing data, so in this way by caching data in redux, we can improve our data performance.

- Look at replacing [Undux](https://undux.org/) with Redux:

Undux is a simple & typesafe alternative to Flux and Redux. Use it to manage state and data for ReactJS applications of all sizes. Below is the comparison between Redux and Undux.

| Tables        | Redux         | Undux |
|:-------------:|-------------|-----|
| Speed      | Globs of boilerplate which slows down engineering | Near-zero boilerplate which enables rapid iteration |
| Trace | Actions, creators, types, reducers, callers spread all across lots of files which makes it harder to trace code   |   Do everything right in your view |
| Safety | Really hard to type-safely      |    100% typesafe |


## 5. Acceptance criteria
Minimum Viable Product:
- Design an efficient front-end interface to interact between users and cloud server. 
- Understand the multiparty computation structure, optimize the front end to help users search data faster. 

Potential stretch goals:  
- Get page response time down
- Visualization of brain volume results.
- Deploy UI to MOC and scale test in the MOC.

## 6. Release Planning

Until February 6 2019, the MPC API hasn't been implemented yet. Based on the schedule, the MPC API can be released after we finished the ChRIS Store rewriting and front-end of ChRIS platform. The data visualization is an important part of user experience, we want to show something pleasant the user can view from the results of the algorithm. 

- Sprint 1(weeks 2&3): Get familiar with project technology, including React, Patternfly, Redux, Undux and so on. And have a basic understanding of the ChRIS platform and ChRIS UI project of Redhat.

- Sprint 2(weeks 4&5): Start implementing redux for the ChRIS UI, take all backend objects and populate them into the cache and make them available.

- Sprint 3(weeks 6&7): Create some unit for testing and ensuring redux can work correctly.

- Sprint 4(weeks 8&9): Deploy the UI on the MOC and incorporate testing to validate functionality.

- Sprint 5(from week9): Build a new front end component to visualize the MOC calculation reult.

More jobs needed to be added...

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

