Simulated Football by Sonny Sheth
Version 3

This game was written using Javascript, HTML and CSS.

Description:

This is a simulated football game in which the user plays against the computer. The user starts the game by receiving a kick from the computer.
Thereafter, the user may call an offensive play:

1. 3 types of Run plays
2. 3 types of Pass plays
3. Kick Field Goal
4. Punt

Each run or pass play may result in negative yardage, zero yardage, positive yardage, a turnover (via fumble or interception), a touchdown, a turnover on downs or a turnover on a missed fieldgoal attempt.

If a run or pass play results in such negative yardage that it places the ball at a field position less than zero (the user's goal line), then it results in a safety, giving 2 points to the computer.

The computer will receive the ball on offense in the following scenarios:

1. User scores a TD or kicks a field goal
2. User turns the ball over (either on downs, throwning in interception or fumbling the ball)
3. Attempts a field goal, but misses
4. Punts the ball

When computer is on offense, the user chooses either a run defense or a pass defense and the program will simulate the computer's offensive play, which will be a run attempt, pass attempt, fieldgoal attempt or punt. 

Even when the computer is on offense and it is 4th down, and it is likely that the computer will either attempt a fieldgoal or punt the ball, the user is limited to choosing either Run Def or Pass Def to protect against the odd chance that the computer executes a run or pass play. For now, the program has built in scenarios in which a computer's fieldgoal attempt is unsuccessful, and thus, for now, there is no need for a separate fieldgoal block defense button. And for now, there is no punt block scenario built in, and thus there is no need for a punt block defense button.

The results of the computer's play are the same of the user's. 

Each play that is run by the user and computer will randomly run the clock down by a certain amount. The game ends when the clock reaches 0. The game can end with a tie score. 

On the left side of the screen, the program collects certain player stats in real-time. 