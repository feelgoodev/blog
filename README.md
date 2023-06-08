 ## 배포된 링크
 https://profound-choux-3f9265.netlify.app/
 
 Developed since I wanted to make a blog that is customizable myself

 
 Skill stack: React, Typescript, Javascript, Tailwind Css, react-query, react-router, Firebase RealTime Database, Netlify

# Main Structure

    * Introduction : Blog intro page
    * PostLists : Blog posts page
    * PostDetails : Blog post detail page
    * CreatePost : Page to create a new post, which is accessable only my admin

    In CreatePost only admin is possible to access by the data saved in Firebase RealTime DB.
    When post is made, the meta data & detail post content is saved in same DB as well.
    Used react-query to cache the data retrieved through GET request while creating, modifying or getting list of the posts. 

    API logics that has to work derectly with Firebase Realtime DB is seperately saved in firebase.ts.
    Made custom hooks for main logic related to using DB regarding its interaction with Client => useCategory, useDetail, useMetaData