/* 
This is an array of  the icons in our nav bar, the name links to the page we will direct to when we click it
   It is scalable and dynamic, useful for future expansion when we have more pages. 
   We just add the name, className of the icon and the link to the page we will link to and it will automatically
   be added in our app without writing any extra code

*/

    const navBarIcons = [
        {
            name: 'Search',
            className: 'fa fa-search',
            pageName: 'explore',
        },

        {
         name: 'Home',
         className:  'fa fa-home',  
         pageName: 'home',
        },

        {
            name: 'Series',
            className: 'fa fa-television',
            pageName: 'shows',
        },

        {
            name: 'Movies',
            className: 'fa-solid fa-clapperboard',
            pageName: 'movies'
        },

        {
            name: 'Watchlist',
            className: 'fa fa-heart',
            pageName: 'watchlist'
        }
    ]

export default navBarIcons;