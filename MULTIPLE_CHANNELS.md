# CREATING MULTIPLE CHANNELS
1. We define a model board
    {
        id: '', 
        noOfPlayers: // max 4
        lastUpdate: // updated when a player is connected or disconnected
    }

2. When a player connects 
    1. Check the last added board for noOfPlayers
    2. If noOfPlayers < 4, add player to board 
    3. If noOfPlayers >=4, create new board and add player to that board. 

3. When a new board is created, a Worker is created along with that.

4. Workers are way of multi threading in node. The front end stuff will not be changed as the events will be emitted to that particular boardid 

5. On disconnect of the last player of a board, the worker gets close and board is deleted


