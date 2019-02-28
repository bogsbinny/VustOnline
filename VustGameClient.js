console.log('vust-client-loaded');
console.log(window.runtimeScene);

PlayerIO.useSecureApiRequests = true;
PlayerIO.authenticate(
    'vust-online-lr2ljxnwx0ktwf1gmxvow',    // game id
    'public',                               // connection id
    { userId: 'guest' },                     // authentication arguments
    {},
    function (client) {
        client.multiplayer.createJoinRoom(
            'betaworld',            // room id
            'VustOnline',           // room type
            true,                   // visible
            {},                    // room data
            { name: 'john' },       // join data
            function (connection) {
                connection.addMessageCallback("*", function (message) {
                    console.log(message.toString());
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