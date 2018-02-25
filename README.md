Share Clipboard
===============

The [Node.js](http://nodejs.org) version of [Share Clipboard](http://langui.net/share-clipboard/ "Share Clipboard") allows you to share the clipboard text across different platforms, including Mac OS X, Windows and Linux.

With the help of [Share Clipboard](http://langui.net/share-clipboard/ "Share Clipboard") apps, you can even share the clipboard text with iOS devices.

How to Use
----------

### Share Clipboard

Share Clipboard acts as client as well as a server, you can copy text between different Share Clipboard instances.

1. install the copy-paste module: <code>npm install copy-paste</code>
2. run the script in the terminal: <code>node share-clipboard.js</code> or <code>node share-clipboard.js &lt;IP_ADDRESS&gt;</code> (such as <code>node share-clipboard.js 192.168.1.100</code>, to connect to a Share Clipboard instance that is already running on 192.168.1.100)
3. if you haven't specified the IP address in the previous step, connect other Share Clipboard (or Share Clip) instances to this instance
3. you can copy among the Share Clipboard instances now

### Share Clipboard Server

Share Clipboard Server acts as a redirector, broadcasting the clipboard text from a Share Clipboard client to the other ones, the server clipboard is left untouched.

1. run the script in the terminal: <code>node share-clipboard-server.js</code>
2. connect Share Clipboard (or Share Clip) clients to the server
3. you can copy among the Share Clipboard clients now

Note: You should run this script on a computer that no Share Clipboard is running on, since they use the same port (7582).

Share Clipboard / Share Clip Apps
---------------------------------

Share Clipboard / Share Clip is also availble as native apps, check them out if you are interested.

Share Clipboard for iOS:  
[http://itunes.apple.com/app/share-clipboard/id519596127?mt=8](http://itunes.apple.com/app/share-clipboard/id519596127?mt=8 "Share Clipboard for iOS")

Share Clipboard Free for iOS (free):  
[https://itunes.apple.com/app/share-clipboard-free/id555952100?ls=1&mt=8](https://itunes.apple.com/app/share-clipboard-free/id555952100?ls=1&mt=8 "Share Clipboard Free for iOS")

Share Clipboard for Mac OS X:  
[https://itunes.apple.com/app/share-clipboard/id619587463?ls=1&mt=12](https://itunes.apple.com/app/share-clipboard/id619587463?ls=1&mt=12 "Share Clipboard for Mac OS X")

Share Clip for Windows/Linux (free):  
[https://www.dropbox.com/sh/v1gczatn5sk2mqs/QH9p3xSoGC/ShareClip](https://www.dropbox.com/sh/v1gczatn5sk2mqs/QH9p3xSoGC/ShareClip "Share Clip for Windows/Linux")

Share Clipboard Homepage:  
[http://langui.net/share-clipboard/](http://langui.net/share-clipboard/ "Share Clipboard Homepage")

## License

Share Clipboard is released under the MIT license. See
the [LICENSE](LICENSE) file.
