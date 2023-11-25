import minimist from "minimist";
import _ from "lodash";

/**
 * 	@class
 */
export class ProcessUtil
{
	/**
	 *	@param port	{any}
	 *	@returns {boolean}
	 */
	static isValidPortNumber( port : any ) : boolean
	{
		return _.isInteger( port ) && port > 80 && port <= 65535;
	}

	/**
	 *	@param name		{string}
	 *	@param [defaultValue]	{number}
	 *	@returns {number | undefined}
	 */
	static getParamIntValue( name : string, defaultValue ?: number ) : number | undefined
	{
		const stringValue : string | undefined = this.getParamStringValue( name );
		if ( _.isString( stringValue ) && ! _.isEmpty( stringValue ) )
		{
			return parseInt( stringValue );
		}

		return defaultValue;
	}

	/**
	 *	@param name		{string}
	 *	@param [defaultValue]	{string}
	 *	@returns {string | undefined}
	 */
	static getParamStringValue( name : string, defaultValue ?: string ) : string | undefined
	{
		if ( ! _.isString( name ) || _.isEmpty( name ) )
		{
			return defaultValue;
		}

		//	...
		const argv = minimist( process.argv.slice( 2 ) );
		name = name.toLowerCase().trim();
		if ( undefined !== argv &&
		     undefined !== argv[ name ] )
		{
			return String( argv[ name ] ).trim();
		}

		//	...
		name = name.toUpperCase().trim();
		if ( undefined !== process &&
		     undefined !== process.env &&
		     undefined !== process.env[ name ] )
		{
			return String( process.env[ name ] ).trim();
		}

		return defaultValue;
	}
}
