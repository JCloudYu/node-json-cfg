(()=>{
	"use strict";
	const fs = require( 'fs' );
	
	
	
	let __config = {};
	let exports = module.exports = {};
	Object.defineProperties(exports, {
		load:{
			value:function(path){
				let config = __LOAD_JSON_OBJECT(path);
				
				// Merge results
				for( let idx in config ) {
					if ( !config.hasOwnProperty(idx) ) {
						continue;
					}
					
					__config[idx] = config[idx];
				}
				
				return exports;
			},
			writable:false, enumerable:true, configurable:false
		},
		save:{
			value:function(path){
				fs.writeFileSync(path, JSON.stringify(__config), {encoding:'utf8'});
				return exports;
			},
			writable:false, enumerable:true, configurable:false
		},
		reset:{
			value:function(){
				__config = {};
				return exports;
			},
			writable:false, enumerable:true, configurable:false
		},
		conf:{
			get:()=>{ return __config; },
			enumerable:true, configurable:false
		}
	});
	
	function __LOAD_JSON_OBJECT(path){
		try {
			fs.accessSync(path, fs.constants.F_OK | fs.constants.R_OK);
			let config = JSON.parse(fs.readFileSync( path, 'utf8' ));
			if ( Object(config) !== config || Array.isArray(config) ) {
				return {};
			}
			
			return config;
		}
		catch(e) {
			return {};
		}
	}
})();
