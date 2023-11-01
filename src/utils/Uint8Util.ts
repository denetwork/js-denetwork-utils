import { TypeUtil } from "./TypeUtil";

/**
 * 	@class
 */
export class Uint8Util
{
	/**
	 *	@param input	{string}
	 *	@returns {Uint8Array}
	 */
	static stringToUint8Array( input : string ) : Uint8Array
	{
		const encoder : TextEncoder = new TextEncoder();
		return encoder.encode( input );
	}

	/**
	 *	@param input	{Uint8Array}
	 *	@returns {string}
	 */
	static uint8ArrayToString( input : Uint8Array ) : string
	{
		const decoder : TextDecoder = new TextDecoder();
		return decoder.decode( input );
	}

	/**
	 *	@param hexString	{string}
	 *	@returns {Uint8Array}
	 */
	static hexToUInt8Array( hexString : string ) : Uint8Array
	{
		if ( ! TypeUtil.isNotEmptyString( hexString ) )
		{
			throw new Error( `invalid hexString` );
		}
		if ( hexString.startsWith( '0x' ) || hexString.startsWith( '0X' ) )
		{
			hexString = hexString.substring( 2 );
		}
		if ( ! TypeUtil.isNotEmptyString( hexString ) )
		{
			throw new Error( `invalid hexString` );
		}

		const byteArray : Uint8Array = new Uint8Array( hexString.length / 2 );

		for ( let i = 0; i < hexString.length; i += 2 )
		{
			byteArray[ i / 2 ] = parseInt( hexString.substring( i, i + 2 ), 16 );
		}

		return byteArray;
	}
}
