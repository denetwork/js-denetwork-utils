import { AesCryptoUtil } from "./AesCryptoUtil";
import _ from "lodash";

/**
 * 	@class
 */
export class StorageCrypto
{
	passwordPrefix : string = `denetwork_password_`;

	constructor( passwordPrefix ?: string )
	{
		if ( _.isString( passwordPrefix ) && ! _.isEmpty( passwordPrefix ) )
		{
			this.passwordPrefix = passwordPrefix;
		}
	}

	/**
	 *	@param object		{any}
	 *	@param password		{string}
	 *	@returns {Promise<string>}
	 */
	public encryptFromObject( object : any, password : string ) : Promise<string>
	{
		return new Promise( ( resolve, reject) =>
		{
			try
			{
				const jsonString : string = JSON.stringify( object );
				resolve( this.encrypt( jsonString, password ) );
			}
			catch ( err )
			{
				reject( err );
			}
		});
	}

	/**
	 *	@param encryptedText	{string}
	 *	@param password		{string}
	 *	@returns {Promise<*>}
	 */
	public decryptToObject<T>( encryptedText : string, password : string ) : Promise<T>
	{
		return new Promise( ( resolve, reject) =>
		{
			try
			{
				const decrypted : string = this.decrypt( encryptedText, password );
				const object : T = JSON.parse( decrypted );
				resolve( object );
			}
			catch ( err )
			{
				reject( err );
			}
		});
	}

	/**
	 *	@param plaintext	{string}
	 *	@param password		{string}
	 *	@returns {string}
	 */
	public encrypt( plaintext : string, password : string ) : string
	{
		const finalPassword : string = `${ this.passwordPrefix }-${ String( password ) }`;
		return AesCryptoUtil.encryptAES( plaintext, finalPassword );
	}

	/**
	 *	@param encryptedText	{string}
	 *	@param password		{string}
	 *	@returns {string}
	 */
	public decrypt( encryptedText : string, password : string ) : string
	{
		const finalPassword : string = `${ this.passwordPrefix }-${ String( password ) }`;
		return AesCryptoUtil.decryptAES( encryptedText, finalPassword );
	}
}
