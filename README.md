# Front-End-Development-for-Multi-Party-Computation-in-the-Cloud

## Project Description

ChRIS is an open source framework that utilizes cloud technologies to democratize medical analytics application development and enables healthcare organizations to keep owning their data while benefiting from public cloud processing capabilities.  The ChRIS UI is a platform to enable ChRIS researchers to be able to easily access and use the latest image processing technology as well as the power and speed of cloud computing in exploring and making discoveries in medical imaging data. Enabling collaboration and sharing between researchers is an important secondary goal.

The project is based on the previous backend API -- [ChRIS API](https://fnndsc.github.io/fnndsc/chrisdoc/) and the core function is image processing function, we want to rewrite and optimize the frontend UI and framework by using [React](https://github.com/facebook/react) and [Redux](https://github.com/reduxjs/redux) to improve the user experience.


## 1. Vision and Goals

* Set up react scaffolding using [create-react-app](https://github.com/facebook/create-react-app) and get familiar with redux
* (Crucial work!)Set up [ChRIS store UI](https://github.com/FNNDSC/ChRIS_store_ui) by using redux and then look at replacing [undux](https://github.com/bcherny/undux) with redux in chris store UI, which is a light version of redux
* Build new front end component for visulization of brain volum callculation from multiple-party computation
* Privilege management and data access, design different data pipelines using ChRIS RESTful APIS


## 2. Scope and Features
Basically, the scope of project targets at medical/neuroscience researchers focusing on analysis of brain imagery, specifically for the demo we're working on its researchers interested in comparing the volumes of specific brain structures across different groups of patients at different medical institutions.
Features of the project:

* Performance: This project really cares about performance and speed of the data, which is a main concern for the project 
* Extensibility: Provides an extendable interface that allows third-party service plugin

## 3. Solution Concept

### Global Architectural Structure Of the Project:
<img align = center src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/diagram.png">
Source: ChRIS UI Design Brief. RedHat, 20 Nov. 2018.

Some concepts about the project in the diagram:
- **Plugin:** A containerized set of image processing software that can be applied to image data input into the plugin in order to manipulate it. Plugin input and output.
- **Pipeline:** A pipeline is a template that can be used to process data.
- **Feed:** A feed is a specific run of a pipeline.
- **Data:** Data is the actual data that feeds operate on / manipulate.
- **Project:** A composition of feeds and maybe ACLs and metadata (notes, chats, labels, etc.) for collaboration.

### A brief flow diagram to show how the front-end works:
<img align = center src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/images/Project-Based%20Feed%20Screen-By-Sreen.png">
Source: ChRIS UI Design Brief. RedHat, 20 Nov. 2018.

## 4. Acceptance criteria(MVP)
- Design an efficient front-end interface to interact between users and cloud server.
- Understand the multiparty computation structure, optimize the front end to help users search data faster

## 5. Release Planning
(This is just a temporary plan, will be modified depending on the progress...)

- Sprint1(weeks 1&2): get familiar with project technology, including React, Patternfly, Redux, Undux and so on. And have a basic understand about the Chris platform and Chris UI project of redhat.

- Sprint2(weeks 3&4): start the redux implementation in Chris Store, rewrite the frame by using Redux and fetch all the data object into the caches.

- Sprint3(weeks 5&6): start implementing redux for the Chris UI, take all backend objexts and populate them into the cache and make them available.

- Sprint4(weeks 7&8): creating some unit for testing and ensuring redux can work correctly 

- Sprint5(from week9): building new front end component for visulization of brain volume calculation.

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
