# weather-dashboard

[![Generic badge](https://img.shields.io/badge/😗-react-blue.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/🙃-material--ui-blue.svg)](https://shields.io/)

## Description

This is is the third iteration of our [portfolio](https://jds-mern-world.herokuapp.com/)! This was the first time that we are creating our portfolio site using react! To make this I used the Material UI for the pre built components it offers. Although I am pleased with the clean look of the portfolio I would like to add more of my personality into the next iteration of it! The structure is still the same. There is a portfolio section that highlights a few of my preojects as well as a contact me section which saves the users infomation to a mongo db data base!

## Table of Contents

- [Preview](#preview)

- [Project Significance](#project-significance)

- [Code Highlights](#code-highlights)

- [License](#license)

- [Contributing](#contributing)

- [Questions](#questions)

## Preview

![portfolio preview](client/public/images/reactPort.gif)

## Project Significance

This project was great practice at creating something that is a direct representation of the quality of work we can do. It felt more "high stakes" than the react project we had been working up to this point. The website is simple enough that the user won't really be able to tell that this is a react site. Still, as the developer, if felt like this was a personal stamp of my ability to create with react up to this point!

## Code Highlights

It doesn't seem like there is much going on in the code. Truthfully there is not much going on the user enmd display either. Now that I am coming back to this read me after having some more react practice under my belt I can say that I was dead set on only using material ui components for this. In my next iteration of my portfolio I will keep in mind that I can mix in some custom built components with material ui. If I did this at the time of building this I would have ended up with a cleaner navigation bar with some cool css effects!

```
 <Grid container spacing={3} style={{justifyContent:"center"}}>
        <Grid className={classes.right} item lg={6}  >
          <Link style={{padding: "20px", color: "green"}} to="/" className={classes.navItems}>
            HOME
          </Link>
        </Grid>

        <Grid className={classes.left} item lg={6}  >
          <Link style={{padding: "20px", color: "green"}} to="/contact" className={classes.navItems}>
            CONTACT
          </Link>
        </Grid>
      </Grid>
```

![portfolio preview](client/public/images/nav.png)

## License

MIT

## Contributing

[Jonathan-David Lopez Martinez](http://www.jds.world/)

## Questions

If you have any questions about the repo, want to open an issue or contact me directly please reach out to focus4ursoul@gmail.com. Check out more of my work at [Goodlvn](https://github.com/Goodlvn).

<img src="https://avatars3.githubusercontent.com/u/37821521?v=4=50x50" alt="drawing" width="200"/>
