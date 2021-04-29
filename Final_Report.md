# Book Recommender

## Team Name

Book Recommendations

## Team Members

* Camille Williford
* Logan Tillman
* Braden Martin
* Grant Anderson
* Braden Butler

## Intro

Our team worked on an application that recommends books based on their preferences of author or genre. We wanted to create an application that motivated readers to read more frequently by providing them with a tool that makes selecting their next book easy.
    
The main goal of our project was to make it easier on both those getting into reading and avid readers who struggle to find interesting new works. In this way, we are similar to something like Goodreads. However, we had hoped to set ourselves apart by making an app that also helps users track their progress as readers and not receive redundant suggestions.

Once we got into development, we realized that our hopes of adding features for user profiles and a feedback system were a bit ambitious, issues with setting up the Ember development environment forced us to scale the application back to our original design goal: to make a website that can recommend books based on user input.

After completing development, our website was able to retrieve and display book data from the Google Books API based on user input via our front end; this meets the ultimate design goal of our project.

## Customer Value

Overall, our customer value didn’t change once development began, as the initial need and proposed solutions still applied to our ultimate design goal: creating a website to query and display book data from an API based on user input.

### Customer Need:

Our primary customer would be avid readers looking to find new reading suggestions based on user input. The number of choices when selecting a new volume is daunting, many end up pigeon wholed into a genre or even specific author, finding quality books within this massive library can be challenging. Our app tries to help reduce this difficulty by filtering options by genre and author to narrow the choices down. The days of scouring the internet for top read lists and book discussion boards are gone with the use of this app that will make unbiased suggestions that are privacy-focused.

### Proposed Solution:

For the customer, our app provides an easy-to-use method of finding book recommendations. This benefits our customer by providing them with a much less strenuous and time-consuming method of discovering new potential books to read. The main benefit over our app versus similar services (such as GoodReads), is the automation. The user doesn’t need to search through tons of reviews, they will simply enter the needed information into our application and then be met with a list of recommendations. We have yet to test this product on any customers, but with avid readers within the group, we were able to test its functionality effectively ourselves once we began development.

### Measures of Success: 

If the app is able to suggest books to the user within the user given restrictions, and the user selects a new volume to read it will be a success. This app will surely be more time efficient than browsing many resources on the internet for recommendations.


## Technology

### System: 
	
The system consists of a frontend application (using Ember), hooked up to a Lambda Python API that communicates via REST with the Google Books API, to retrieve basic book info including genre, author, and length of the book. This info is then, on request, presented to the user, formatted and filtered for easy consumption. The minimal viable product displays book information to the user from the API. We initially considered additional features, some sort of feedback system for customers to leave feedback about the accuracy of the recommendations or their overall opinion of the app. Other enhancements we considered included user profiles that would contain previously read books and books that wish to be read, these features never made it to development however, due to time constraints.

![alt text](https://github.com/CS340-21/BookRecommendations/blob/master/softwareArchitecture.png?raw=true)

The system was tested in parts. The first step was to ensure that we could properly retrieve book data from the Google Books API via the REST API that we implemented using Lambda. Second we tested that we could serve that data up to the frontend application on demand. Third, we made sure we could display that info to the user from the frontend application.

The frontend of our application used Ember, which we chose due to some members’ previous experience with it, as well as it’s efficiency in spinning up skeleton projects and ease of viewing frontend development through its local host functionality. A key factor in selecting Ember was the addon Mirage, which could be used to decouple frontend and backend development, by mimicking the API. Mirage ended up being very difficult to implement. We did successfully implement it, but the time put into it was not worth the value we got out of it.

Ember.js is a framework that enables quick, flexible, detailed builds with ample documentation that is great reference material for developers. Ember can create models, routers, controllers, adapters, serializers, and templates with a single command all of which can be further customized to the needs of the data or application. It may take a minute to learn the terminology, but with the documentation and the community around Ember you can create some really cool app fairly quickly.

The main software component of our project is the Lambda function that serves as our API backend.  Connected through an AWS API Gateway, our lambda function is essentially another API that allows us to perform server-side functions without having to set up our own server. This function is implemented in python, and builds the Google Books API request string based on user parameters. After that, it sends the request and reduces the response body to a more manageable format for our front end.



The Google Books API has lots of metadata on books, which can be very complicated to parse through on the front end. This image displays the method we used in our Lambda function to reduce the response body to a less-cluttered format. To reduce the response, we simply grab the attributes we want from the original response body, and append them to a new responseObject, which we send to our front end for much simpler parsing. This data reduction simplified the response parsing on the front end, since our entire response body for twenty books matching the search criteria was now smaller than the original response for a single book.

⅓ of Original Response Body for a Single Book


Reduced Response Body of a Single Book



Overall, while we encountered difficulties during parts of the design process, we eventually fixed all of the issues we encountered. Although setting up mirage took a significant amount of time and effort, we eventually got it to work, just in time for us to not need it anymore. Additionally, the issues we encountered with the Books API returning null attributes was remedied by checking for null response attributes in our Lambda function and adding special code to our frontend to display null attributes in specific ways. An issue with the s3 deployment caused us to have to delete the objects in the s3 bucket every time we wanted to deploy changes to our web host, this issue was annoying, but didn’t significantly impact development. Finally, we had issues with our response body from our Lambda API not being in a readable format for Ember to interpret, we fixed this issue by creating a serializer to alter the format to Ember-readable JSONAPI format. Additionally, our front end development went well once we got past Mirage.

### Tests

Since the main software component of our project was our API, the main testing we did was to try lots of different search parameters on our front end, to see how it would display them. This testing is what alerted us to the fact that the Google Books API response doesn’t guarantee that certain metadata will be available for a given book; this meant that we might not be able to get the pageCount or genre of a title. This testing brought this to our attention so that we could account for it on the front end to ensure null data wasn’t being displayed.

Testing our specific front end implementation was done through locally hosting our website as we made changes through the use of ember; this allowed us to quickly see how our front end code translated visually onto our website, and allowed us identify and fix issues with it much more quickly.

Since our tests were meant to identify issues, the results of them were simply identified issues that we could then fix.

### Tools:

* Frontend: Ember.js, Mirage
* API: AWS tools, Lambda Function and API Gateway
* Database: N/A, API allows 1000 reqs/day
* IDE: VS Code - Frontend | VSCode - Backend | Python

## Team

### Skills:

Logan and Camille have experience using Ember.js to build frontends, as well as Java to build APIs. Logan and Camille also have experience with Oracle databases and Microsoft SQL Server. Braden Martin has basic web development experience (HTML, CSS, JS), as well as experience working with SQL databases. Grant has experience with Python for frontend applications and Java APIs. Braden Butler has experience with C and C++. We’re familiar with Java APIs but have never built one from scratch—this led to us swapping to a python API integration (using AWS Lambda) later.

### Main Roles:

* Grant - (Frontend)
* Logan - (Backend: Books and Lambda API)
* Camille - (Backend: AWS Setup, Ember & API integration, Customer, Team Lead)
* Braden M. - (Backend: Books and Lambda API , Customer, Team Lead)
* Braden B. - (Frontend)

These are the main roles our team members had, although every member worked on the front end design to some degree once their other tasks were completed.

## Project Management

### Schedule:
| Date      | Expected Features                                                                       |
|-----------|-----------------------------------------------------------------------------------------|
| 2/19-2/25 | Work Begins: Select programming languages, learn basics, map out feature list           |
| 2/26-3/11 | First Sprint: Set up dev. environment, begin work on front end, set up Google Books API |
| 3/12-3/18 | Second Sprint: Add design to front end, add filtering to Google Books API               |
| 3-19/3-25 | Implement Lambda functionality                                                          |
| 3-26/4-1  | Third Sprint: Refine Lambda functionality, improve front end layout                     |
| 4-9/4-26  | Final Sprint: Integrate API with front end, bug fixes, design tweaks, bonus features    |
| 4/27      | Submission: Presentation, demo, and report                                              |

Overall we met the ultimate design goal of our project: we have the functionality to take user search parameters, make an API request with them, and return and display the relevant data through our front end. The additional features we had considered, such as adding user profiles for tracking already suggested books and having a feedback system on our recommendations weren’t completed, due to the difficulties we encountered setting up our Ember development environment (Mirage specifically). These delays caused our front end to be less developed than we had hoped (appearance-wise), but it still has the minimum functionality we were expecting.

## Reflection

There were ups and downs in our development of this project. Overall, we are very proud of our backend, as it was efficiently implemented and has more functionality than we expected (Lambda function reducing the response body). Additionally, our front end has the basic functionality we expected, which we consider a success (though we wish we had more time to improve the design of it). One of the most difficult parts of this process was setting up times to meet and discuss the project, as all members have varying schedules; trying to find a common availability between five people was a challenge. Despite the difficulties we experienced, we feel that our project was a success, as it met the basic functionality we imagined when brainstorming the project.
