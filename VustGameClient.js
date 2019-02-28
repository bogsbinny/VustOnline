console.log('vust-client-loaded');
console.log(window.runtimeScene);

PlayerIO.useSecureApiRequests = true;
PlayerIO.authenticate(
    'vust-online-lr2ljxnwx0ktwf1gmxvow',    // game id
    'public',                               // connection id
    { userId: 'guest' },                     // authentication arguments
    {},
    function (client) {
        window.client = client;

        client.multiplayer.createJoinRoom(
            'betaworld',            // room id
            'VustOnline',           // room type
            true,                   // visible
            {},                    // room data
            { name: 'john' },       // join data
            function (connection) {
                window.connection = connection;

                var my_player_id = -1;

                connection.addMessageCallback("*", function (message) {
                    if (message.type == "init") {
                        my_player_id = message.getInt(0);

                        connection.send("init2");
                    }

                    if (message.type == "join") {
                        
                    }

                    if (message.type == "location") {
                        if (message.getInt(0) == my_player_id)
                            return;
                        
                        var x = message.getInt(1);
                        var y = message.getInt(2);

                        window.runtimeScene.getObjects("OtherPlayer")[0].setX(x);
                        window.runtimeScene.getObjects("OtherPlayer")[0].setY(y);
                    }
                });

                // setup a disconnect handler:
                connection.addDisconnectCallback(function () {
                    console.log("disconnected from room");
                });
            },
            function (error) {
                console.log(error);
            }
        );
    },
    function (error) {
        comsole.log('[playerio] error:' + error);
    }
);