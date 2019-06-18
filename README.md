# RealReview React Web
RealReview app rewritten using react hooks and asp.net core web api(RealReviewWebAPI repo) for backend. This app works by using backend api calls to RealReviewWebAPI project. Both these projects can be setup in local system and the Real Review experience can be had using a react web application.

## Real Review Web App: ##
![Alt text](https://github.com/cakiran/RealReviewReactWeb/blob/master/RealReviewReactHookMainView.PNG?raw=true "Real Review web app")
=======
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Use case: ##
We all read reviews and there are many of them for a given restaurant or any other business entity. How can we get a real sense of how the business is doing and how their services are? Yes we can spend time and read all the reviews ourselves to get the real picture that is being presented by all the reviews or you can use RealReview an AI based WPF app which will read all the reviews of the business for you and give you an aggregated score which will accurately reflect the holistic picture presented by all the reviewers in the reviews. 

## Technologies Used: ##

React JS 
React Hooks
Bootstrap 4
axios for API calls

## Things Needed: ##

1. VS Code or any other suitable editor
2. Make sure to stand up the API project - RealReviewWebAPI(another repo available here), and enable CORS in it. 

## How does this work and more details: ##
The user will start by searching for different type of restaurant using words like pizza,ice cream  etc and give the location details like zipcode or city. This information is fed to yelp api which returns a list of 20 relevant businesses. Once they are fetched the website lists them with their name, phone number and address details. The user can pick any business from this list to see 3 reviews given by yelp api(3 is the limitation of number of review text provided by yelp api) and also the aggregation of the score received for all the reviews provided by passing these review text through the AI based binary classifier pipeline which gives each of them a score. The reviews and score is obtained by making calls to RealReviewWebAPI endpoints. The mean of these scores is the RealReview score. The score is out of 100 with the best business getting 100 and the worst 0. Under the hood React Hooks like useState and useEffect has been used to manager state in functional components with all components created in this website being functional rather than class component. 

The prediction accuracy of the model is 0.83422459893048129, areaunderROCCurve is 0.90494166094715167 and F1Score is 0.83597883597883593.

The binary classifier model is trained on preclassified 1000 yelp comments with 20% separated out for testing. This is a sample app to show the combination of ML.NET, React hooks with asp.net core web API. There are many limitations in this website with the review text from yelp api being only 3 and also the review text being truncated without having the whole review text from the reviewer. This website might not be complete in the sense that the RealReview score is based off just 3 truncated reviews but the concept is very solid which can be scaled up to make a real world working sample. If only I could get more number of reviews and more review text from yelp api! Anyway this concept is free for anyone to use and hope you will learn little more about React hooks from this sample. Enjoy and happy coding. 
