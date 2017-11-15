(()=>{
	"use strict";
	
	// Synchronize all json-cfg modules to make config be the same in the tree
	let travel = module;
	while(travel.parent) {
		travel = travel.parent;
	}
	let __ROOT_ANCHOR = travel.__module_trunk = travel.__module_trunk || {};
	
	
	
	const fs = require( 'fs' );
	const singleton = __ROOT_ANCHOR[ 'json-cfg' ] || __GEN_CONFIG();
	__ROOT_ANCHOR[ 'json-cfg' ] = singleton;
	
	
	
	let __instances = {};
	const exports = __GEN_CONFIG();
	Object.defineProperties(exports, {
		obtain:{
			value:(identifier)=>{
				if ( !identifier ) {
					throw "Config identifier is required!"
				}
				
				if ( !__instances[identifier] ) {
					__instances[identifier] = __GEN_CONFIG();
				}
				
				return __instances[identifier];
			},
			writable:false, enumerable:false, configurable:true
		},
		remove:{
			value:(identifier)=>{
				if ( __instances[identifier] ) {
					delete __instances[identifier];
				}
			
				return exports;
			},
			writable:false, enumerable:false, configurable:true
		},
		trunk: {
			get:()=>{ return singleton; },
			enumerable:false, configurable:true
		}
	});
	
	
	
	module.exports = exports;
	
	function __GEN_CONFIG(){
		const confInst = {};
		let __config = {};
		
		Object.defineProperties(confInst, {
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
	
		return confInst;
	}
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
