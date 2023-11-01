import { sha256 } from "ethers"
import * as forge from 'node-forge';
import { TypeUtil } from "../TypeUtil";
import { Uint8Util } from "../Uint8Util";

/**
 * 	@class
 * 	@description secret ends core model
 */
export class AesCryptoUtil
{
	/**
	 *	@param text		{string}
	 *	@param password		{string}
	 *	@returns {string}
	 */
	static encryptAES( text : string, password : string ) : string
	{
		const aesKey : Uint8Array = this.getAesKeyByPassword( password );
		const iv : Array<number> = this.getAesIvByPassword( password );

		const cipher = forge.cipher.createCipher( 'AES-CTR', forge.util.createBuffer( aesKey ) );
		cipher.start( { iv : iv } );
		cipher.update( forge.util.createBuffer( forge.util.encodeUtf8( text ), 'utf8' ) );
		cipher.finish();
		const encrypted = cipher.output;
		return ( forge.util.encode64( encrypted.getBytes() ) );
	}

	/**
	 *	@param ciphertext	{string}
	 *	@param password		{string}
	 *	@returns {string}
	 */
	static decryptAES( ciphertext : string, password : string ) : string
	{
		const aesKey : Uint8Array = this.getAesKeyByPassword( password );
		const iv : Array<number> = this.getAesIvByPassword( password );

		const decipher = forge.cipher.createDecipher( 'AES-CTR', forge.util.createBuffer( aesKey ) );
		decipher.start( { iv : iv } );
		decipher.update( forge.util.createBuffer( forge.util.decode64( ciphertext ) ) );
		decipher.finish();
		return forge.util.decodeUtf8( decipher.output.data );
	}

	/**
	 *	@param password		{string}
	 *	@returns {Uint8Array}
	 */
	static getAesKeyByPassword( password : string ) : Uint8Array
	{
		if ( ! TypeUtil.isNotEmptyString( password ) )
		{
			throw new Error( `invalid password` );
		}

		const sha256String : string = sha256( Uint8Util.stringToUint8Array( password ) );
		return Uint8Util.hexToUInt8Array( sha256String );
	}

	/**
	 *	@param password		{string}
	 *	@returns {Array<number>}
	 */
	static getAesIvByPassword( password : string ) : Array<number>
	{
		if ( ! TypeUtil.isNotEmptyString( password ) )
		{
			throw new Error( `invalid password` );
		}

		const sha256String : string = sha256( Uint8Util.stringToUint8Array( password ) );
		const aesKey : Uint8Array = Uint8Util.hexToUInt8Array( sha256String );
		return Array.from( aesKey.slice( 0, 16 ) );
	}
}
