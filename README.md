# node-json-cfg #

This module is designed to provide a more convenient shared configuration system.

## Overview ##
When coding in nodejs environment, you may encounter conditions in which you need to keep track all configurations among submodules. To fulfill the requirement, you may come up with a customized module. But typically, even the main module and the submodules are dependent to the same customized module, you'll end up with modules with different instances. This is very frustrating...

No worry, this module is also designed to solve the above situation. As long as you include the module with the same version, you'll have the ability to share configuration storage among all your modules and submodules.



## Feature ##

* An easy to use configuration holder
* Easy to load / access
* <span style='color:#F00'>Synchronize among all modules including ones required by submodules</span>



## Installation ##

All in have to do is...

```javascript
$ npm install json-cfg
```

Require the module within your scripts and use it!

```javascript
let config = require( 'json-cfg' );
```



## Examples ##

### General Usages ###

All configurations can be accessed via ```conf``` property of the module.  
For example, you have two configuration files config1.json and config2.json

```javascript
// config1.json

{
	"https": false,
	"address": "localhost",
	"port": 8080
}
```

```javascript
// config2.json

{
	"https": true,
	"address": "www.google.com",
	"port": 443
}
```

You can load them and write in local moduleA...

```javascript
// moduleA.js

// You can load multiple configurations and this module will merge them into the same space
let config = require( 'json-cfg' ).load( './config1.json' ).load( './config2.json' );

// writing configuration
config.conf.port = "80";
```

and you can access the configurations in local moduleB...

```javascript
// moduleB.js

let config = require( 'json-cfg' );
let {https:isHttps, address, port} = config.conf;

const http = require( isHttps ? 'https' : 'http' ).createServer();

// ... do http initialization logics here...
http.listen(port, address);
```

Interestingly, you can also access the same configurations from dependent external module external.js

```javascript
let config = require( 'json-cfg' );

module.exports = {
	showConf: ()=>{
		console.log(config.conf.address); // www.google.com
		console.log(config.conf.port); // 80
		console.log(config.conf.https ? 'https' : 'http'); // https
	}
};
```

### Accessing the Shared Space ###
You can get the shared configuration space using following line

```javascript
let shared = config.trunk;
```


### Separated Spaces ###

In some conditions, you may want to store different configurations separately.  
This can be done via following usage...

```javascript
let otherSpace = config.obtain( 'identifier' );
```

You can always obtain the same configuration space by the same space identifier.  
Moreover, if you're done with specific space, you can remove it via following line...

```javascript
config.remove( 'identifier' );
```

### Reseting ###

If you want to clear a space, just do the following lines...

```javascript
config.reset();
config.obtain( 'identifier' ).reset();
```
<strong>Note that the ```reset``` method only replace the internal configuration holder with newer object. This method won't affect the target object itself.</strong>
