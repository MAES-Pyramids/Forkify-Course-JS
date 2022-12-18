
# Forkify

Forkify  is a dynamic web app for providing detailed food recipes to more than 130 different search queries


## Screenshots

![App Screenshot](https://raw.githubusercontent.com/MAES-Pyramids/Forkify-Course-JS/master/.Deployment%20Screenshots/1.png)

![App Screenshot](https://raw.githubusercontent.com/MAES-Pyramids/Forkify-Course-JS/master/.Deployment%20Screenshots/2.png)


## Documentation
 - The Forkify app is built mainly using Forkify API which provides us with descriptions/images/recipes ....etc (You can access API Documentation [HERE](https://forkify-api.herokuapp.com/)).

 - The Forkify app is built on MVC Architurie which was a KeyStone for the project cause we didn't have a clear expectation of how the app will look at the end so we want a pattern that help us with code reusability and help with developing layout more without a lot of code refactoring.

 - The Forkify app implemented the idea of virtual DOM, which was needed cause we wanted to change some parts of the layout without the need for loading all the DOM which would lead to a significant negative effect on the reusability and performance of the site.

    Note:  we implemented Virtual Dom Explicitly (Manually) cause we developed the Forkify site using Vanilla JS without frameworks.



## Features

- Change ingredients quantity  according to the change in SERVINGS number

- Ability to bookmark recipes you prefer for quick accessing again whenever you want even if you exit the site.

- Ability to add new recipes for a particular food but it won't  be visible to other except if the admin aprove it to be in the API database.



## API Reference

#### Search : Returns a list of recipes for a specific query

```http For Recipes
  https://forkify-api.herokuapp.com/api/search
```

| Parameter | Required     | Description                |
| :-------- | :------- | :------------------------- |
| `q` | `Yes` | Query text. For example q=pizza. See the list of all available queries [HERE](https://forkify-api.herokuapp.com/) |

Example URL: https://forkify-api.herokuapp.com/api/search?q=pizza


#### Get item :Returns the details about a specific recipe
```http
  https://forkify-api.herokuapp.com/api/get
```

| Parameter | Required     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `rId`      | `Yes` | Recipe id. For example rId=47746 |

Example URL: https://forkify-api.herokuapp.com/api/get?rId=47746


## Demo

You can view the website hosted version on Netlify by pressing [Here](https://maes-forkify.netlify.app/)


