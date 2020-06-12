# DiscoBowl

## Do you know how bowling points are tallied?

Me neither. So I googled it then created made a simple app which lets you keep score of a rounds of bowling with as many players as you want. It automatically rotates through each player, so you simply click the number of pins they get per throw and watch the scorecard fill itself out. It's also Disco themed!

## Want to Try?
Here is a link! [DiscoBowl!](https://discobowl.netlify.app/)

## A different scorecard

The scorecard I've made here is slightly different than your regular scorecard. Instead of each frame being a collective count of your points so far, the frame has its own score which denotes the amount of points earned for that frame on its own (including bonus from spare/strike/etc), while the final tally on the right updates your total score in real time. This makes it much easier for beginner bowlers to understand how the point system works

## How to use it?

1. Add players to the bowler section by name, with no limit to the number of players. Then press 'Let's Boogie'.

![](client/src/images/screencap1.png)

2. Starting from the top and rotating through players, you click the number of pins knocked until the game ends. The app will handle whose turn it is and how the frames work, all you have to do is enter the pin number.

![](client/src/images/screencap2.png)

3. Once the game is over, the victor is awarded a win! You can then play again, and the app will keep track of players wins. You can also press complete reset, which will reset everything and take you back to the home page.

![](client/src/images/screencap3.png)

## Tech

This was made with the Angular CLI v9.0.7.

## Improvements 

-Could change the 0 to dashes, but 0's seem nicer for beginners 

-Some sort of celebration on Strike

