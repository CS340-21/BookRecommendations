# Book Recommendations

## Team Members

* Camille Williford
* Logan Tillman
* Braden Martin
* Grant Anderson
* Braden Butler

## Intro

Our team is working on an application that recommends books based on their preferences of genre, authors, and desired length. Our goal is to create an application to motivate readers to read more by providing them with a tool that makes selecting their next book easy.
    
The main goal of our project is to make it easier on both those getting into reading and avid readers who struggle to find interesting new works. In this way, we are similar to something like Goodreads. However, we hope to set ourselves apart by making an app that also helps users track their progress as readers and not receive redundant suggestions.

## Customer Value

### Customer Need:

Our primary customer would be avid readers looking to find new reading suggestions based on user input. The number of choices when selecting a new volume is daunting, many end up pigeon wholed into a genre or even specific author, finding quality books within this massive library can be challenging. Our app intends to help reduce this difficulty by filtering options by genre, author, and length of volumes to narrow the choices down. The days of scouring the internet for top read lists and book discussion boards are gone with the use of this app that will make unbiased suggestions that are not even creepily spying on your info to make way too accurate suggestions that are exactly like what you’ve already read. We’re not Siri, Cortana, or Alexa so chill out we can’t afford to monitor your user info.

### Proposed Solution:

For the customer, our app will provide an easy-to-use method of finding book recommendations. This benefits our customer by providing them with a much less strenuous and time-consuming method of discovering new potential books to read. The main benefit over our app versus similar services (such as GoodReads), is the automation. The user doesn’t need to search through tons of reviews, they will simply enter the needed information into our application and then be met with a list of recommendations. We have yet to test this product on any customers since it has yet to be developed, but with some avid readers within the group, we should be able to test its functionality effectively once development begins.

### Measures of Success: 

If the app is able to suggest books to the user within the user given restrictions, and the user selects a new volume to read it will be a success. This app will surely be more time efficient than browsing many resources on the internet for recommendations.    Needs more work, but I’m moving on for now.

## Technology

### System: 
	
The system will consist of a frontend application (likely some JS framework), hooked up to a (java? Python?) API that will communicate via REST with the Google Books API, to retrieve basic book info including genre, author, and length of the book. This info will then, on request, be presented to the user formatted and filtered for easy consumption. The minimal viable product displays book information to the user from the API. If time permits, we could implement some sort of feedback system for customers to leave feedback about the accuracy of the recommendations or their overall opinion of the app. Other possible enhancements could include user profiles that contain previously read books and books that wish to be read.

The system will be tested in parts. First step will be to ensure that we can properly retrieve book data from the Google Books API via the REST API that we will implement. Second we will test that we can serve that data up to the frontend application on demand. Third, we will make sure we can display that info to the user from the frontend application.

### Tools:

* Frontend: JS Framework
* API: Java or Python
* Database: N/A, API allows 1000 reqs/day
* IDE: VS Code - Frontend | IntelliJ - Backend

## Team

### Skills:

Logan and Camille have experience using Ember.js to build frontends, as well as Java to build APIs. Logan also has experience with Oracle databases and Microsoft SQL Server. Braden Martin has basic web development experience (HTML, CSS, JS), as well as experience working with SQL databases. Grant has experience with Python for frontend applications and Java APIs. (Other people insert your experiences). None of us have used (JS framework if not ember) before, but we should be able to adapt given our individual experiences. We’re familiar with (backend language) but have never built an API from scratch.

### Roles:

* Grant - (Frontend)
* Logan - (Frontend)
* Camille - (Backend)
* Braden M. - (Backend (API requests))
* Braden B. - (Backend)

## Project Management

### Schedule:

Completion of this project is feasible. We plan on meeting once a week over (Zoom/Discord) to give an update on the progress we’ve made. We will have constant chats over Discord for smaller questions/suggestions. We will develop a full schedule and timeline with milestones in our final project proposal.

### Constraints:
	
We’re limited to 1000 Google Books API calls per day. There are no legal constraints. We don’t plan on storing user data so there are no ethical constraints either.

### Resources:

Google Books API provides all of the data we’re going to use.

### Descoping: 

To prevent overcommitting and being unable to finish the core aspects of our app, we will develop the most crucial features first, such as the API to make requests and the front/backend to initialize and display them. Developing our app in this way ensures that the most crucial features are completed and functional before moving on to the nonessential ones. If our app didn’t fully complete the request of the user but still provided random books, it could potentially still fulfill the needs of the consumer.
