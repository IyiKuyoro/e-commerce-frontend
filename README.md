# ECommerceFrontend

![home page image](https://res.cloudinary.com/iyikuyoro/image/upload/v1561122561/turin/Screenshot_2019-06-21_at_1.50.36_PM.png "SHOPMATE")

This project is the frontend application for an e-commerce platform named Shopmate.

- **Programming Language**: TypeScript
- **Framework**: Angular
- **Runtime Engine**: NodeJs
- **Testing Framework**: Jasmine
- **E2E testing framework**: Cypress

## Coding style

All code is written in line with the styles that have been setup by the Angular CLI as contained in the tslint.json file.

## Setup

Setting up this application is easy. Install all dependencies by running `npm i` on your machine. No extra setup is needed to run the application in your local environment.

## Codebase structure

There are three main modules in the application.

- **App module**: This module holds all the components that are used at the application level. This is also the module that bootstraps the angular application. In this module, most of the services used the the application are registered to give access around the application.
- **User module**: This module holds all the components that have to do with customers on the application. It is a lazy loaded module from the angular module to give room for easy addition of an admins module in future. Some services that are specific to the user components are registered in this module.
- **Shared module**: The shared modules contains all components that are expected to be shared across the application. There are no services registered in the module and all imported modules here are also exported so they can be used everywhere.

In addition to the main modules, there are two routing modules and one Angular material module.

- **App Routing module**: The app routing modules declares the routing configuration for the application. It lazy loads the user module.
- **User Routing module**: The user routing module contains all customer routes configurations. Some resolvers and guards have been sued to secure and pre-load some routes.
- **Angular Material module**: The angular materials module comes as a sort of convention to enable the usage of Angular material components in the application. This module holds all Angular material modules imports.

**NB**: It is valuable to note that most services, guards and resolvers have been placed just beside their components for easy of access.
