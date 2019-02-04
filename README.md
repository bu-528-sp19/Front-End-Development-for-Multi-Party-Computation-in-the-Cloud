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

The Scope places a boundary around the solution by detailing the range of features and functions of the project. This section helps to clarify the solution scope and can explicitly state what will not be delivered as well.

It targets at researchers who want to innovate new techniques or potential treatments for patients, clinicians who want to achieve medical data from different hospital
* Performance: This project really cares about performance and speed of the data, which is a main concern for the project 
* Extensibility: Provides an extendable interface that allows third-party service plugin

## 3. Solution Concept

This section provides a high-level outline of the solution.

Global Architectural Structure Of the Project:

This section provides a high-level architecture or a conceptual diagram showing the scope of the solution. If wireframes or visuals have already been done, this section could also be used to show how the intended solution will look. This section also provides a walkthrough explanation of the architectural structure.

Design Implications and Discussion:

This section discusses the implications and reasons of the design decisions made during the global architecture design.

<img align = center src = "https://github.com/bu-528-sp19/Front-End-Development-for-Multi-Party-Computation-in-the-Cloud/blob/master/diagram.png">

## 4. Acceptance criteria(MVP)
Design an efficient front-end interface to interact between users and cloud server.

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
- Backend for [ChRIS Store](https://github.com/FNNDSC/ChRIS_store)
- [ChRIS REST API design](https://github.com/FNNDSC/ChRIS_ultron_backEnd/wiki/ChRIS-REST-API-design)
- Duffy, Máirín. ChRIS UI Design Brief. RedHat, 20 Nov. 2018.
- [Undux official website](https://undux.org/)

#### Contact us

- Qingxing Li lqx1996@bu.edu
- Yicun Hou yicunhou@bu.edu
- Haoyu Xu xhy@bu.edu
