(()=>{
	"use strict";
	
	const config = require( '../json-cfg' );
	
	{
		process.stdout.write( `Check loading...\n` );
		
		{
			process.stdout.write( `\tLoading... ` );
			config.load( `${__dirname}/config-1.json` );
			process.stdout.write( `${config.conf.name === "config1" ? 'pass' : 'fail'}\n` );
		}
		
		{
			process.stdout.write( `\tOverwriting... ` );
			config.load( `${__dirname}/config-2.json` );
			process.stdout.write( `${config.conf.name === "config2" ? 'pass' : 'fail'}\n` );
		}
	}
	
	{
		process.stdout.write( `Check resetting... ` );
		config.reset();
		process.stdout.write( `${config.conf.name === undefined ? 'pass' : 'fail'}\n` );
	}
	
	{
		let tmpDir = require( 'os' ).tmpdir();
		process.stdout.write( `Check saving... ` );
		config.load( `${__dirname}/config-1.json` ).load( `${__dirname}/config-2.json` );
		config.save( `${tmpDir}/config-new.json` ).reset().load( `${tmpDir}/config-new.json` );
		process.stdout.write( `${config.conf.name === 'config2' ? 'pass' : 'fail'}\n` );
	}
	
	{
		process.stdout.write( `Check separation... ` );
		config.reset().load( `${__dirname}/config-2.json` );
		config.obtain( 'another' ).load( `${__dirname}/config-1.json` );
		config.reset();
		
		let result = (Object.keys(config.conf).length === 0) && (Object.keys(config.obtain( 'another' ).conf).length !== 0);
		process.stdout.write( `${result ? 'pass' : 'fail'}\n` );
	}
})();
