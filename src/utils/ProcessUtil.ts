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
	 *	@param [defaultValue]	{number | undefined}
	 *	@returns {number | undefined}
	 */
	static getParamIntValue( name : string, defaultValue ?: number | undefined ) : number | undefined
	{
		const stringValue : string | null | undefined = this.getParamStringValue( name );
		if ( _.isString( stringValue ) && ! _.isEmpty( stringValue ) )
		{
			const result = parseInt( stringValue );
			if ( ! Number.isNaN( result ) )
			{
				return result;
			}
		}

		return defaultValue;
	}

	/**
	 *	@param name		{string}
	 *	@param [defaultValue]	{string | null | undefined}
	 *	@returns {string | null | undefined}
	 */
	static getParamStringValue( name : string, defaultValue ?: string | null | undefined ) : string | null | undefined
	{
		if ( ! _.isString( name ) || _.isEmpty( name ) )
		{
			return defaultValue;
		}

		//	...
		let value = undefined;
		const argv = minimist( process.argv.slice( 2 ) );

		//	...
		name = name.toLowerCase().trim();
		if ( undefined !== argv &&
		     undefined !== argv[ name ] )
		{
			value = argv[ name ];
		}

		//	...
		if ( undefined === value )
		{
			name = name.toUpperCase().trim();
			if ( undefined !== process &&
				undefined !== process.env &&
				undefined !== process.env[ name ] )
			{
				value = process.env[ name ];
			}
		}

		if ( undefined !== value )
		{
			if ( null === value ||
				Number.isNaN( value ) )
			{
				return ``;
			}
			if ( _.isString( value ) &&
				`null` === value.trim().toLowerCase() )
			{
				return ``;
			}

			return String( value ).trim();
		}

		return defaultValue;
	}
}
