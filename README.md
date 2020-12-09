# weather-dashboard

[![Generic badge](https://img.shields.io/badge/JQuery-blue.svg)](https://shields.io/)

## Description

Find out the weather haps any where in the world [here](https://goodlvn.github.io/weather-dashboard/)! In this assignment we were tasked with using a third party api [openWeather](https://openweathermap.org/api) in order to find out the current weather conditions of any given city. As a user you should also be able to see a five day forcast of said city. There should also be a way to re-visit the information for cities that you have searched for in the past!

## Table of Contents

- [Preview](#preview)

- [Project Significance](#project-significance)

- [Code Highlights](#code-highlights)

- [License](#license)

- [Contributing](#contributing)

- [Questions](#questions)

## Preview

![portfolio preview](./assets/images/wd.gif)

## Project Significance

This assignment was the first time we communicated with a third party api on our own! We had to make sure we read the docs and understood how to add the information to the dynamic html elements that we were creating. It was reall great practice to use local storage as a method of saviing user data!

## Code Highlights

This felt like the funnest part of the assignment to work on. As a developer we want to make sure that we save all of the cities the user has searched so that we can iterate through them later and generate the html elements. That being said, what if a user searches a city more than once? We need to make sure that if we have already seen this input (the city) then we don't save it to local storage again.

It was a lot of fun trying to figure out which higher order array method to use in order to do this. I ended up landing on ".includes"! Once we grab the item from local storage and parse it into js we can iterate through it to check if the current search already exists! If so we dont save, if we do then we spread the current array and add one more entry to it! If there is no data in local storage we go ahead and save the current search in an array!

```
 async function saveSearches(city) {
    const rawData = await localStorage.getItem("pastSearches");

    if (rawData) {
        const data = JSON.parse(rawData);
        const split = data.includes(city);

        if (split) {
            return
        } else {
            localStorage.setItem("pastSearches", JSON.stringify([...data, city]));
        }

    } else {
        localStorage.setItem("pastSearches", JSON.stringify([city]));
    }
};
```

## License

MIT

## Contributing

[Jonathan-David Lopez Martinez](http://www.jds.world/)

## Questions

If you have any questions about the repo, want to open an issue or contact me directly please reach out to focus4ursoul@gmail.com. Check out more of my work at [Goodlvn](https://github.com/Goodlvn).

<img src="https://avatars3.githubusercontent.com/u/37821521?v=4=50x50" alt="drawing" width="200"/>
