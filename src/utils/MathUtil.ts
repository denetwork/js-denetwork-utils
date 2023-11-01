import { TypeUtil } from "./TypeUtil";

export class MathUtil
{
	/**
	 *	@param value	{bigint}
	 *	@param decimals	{number}
	 *	@return {number}
	 */
	public static floatValueFromBigint( value : bigint, decimals : number )
	{
		try
		{
			if ( value > 0 && decimals > 0 )
			{
				let dividend : bigint = BigInt( 0 );
				let floatValue : number = 0.0;
				if ( decimals > 2 )
				{
					dividend = BigInt( 10 ** ( decimals - 2 ) );
					floatValue = parseFloat( ( value / dividend ).toString() ) / 100;
				}
				else
				{
					dividend = BigInt( 10 ** decimals );
					floatValue = parseFloat( ( value / dividend ).toString() );
				}

				return floatValue;
			}

			return parseFloat( value.toString() );
		}
		catch ( err )
		{
			return 0.00;
		}
	}

	/**
	 *	@param str	{string} e.g.: "0x0000000000000000000000000000000000000000000000000000000004c83670", "0x", ...
	 */
	public static bigintFromString( str : string ) : bigint
	{
		try
		{
			const tmp : string = str.replace( /^0x0+/, '0x' );
			return BigInt( tmp );
		}
		catch ( err )
		{
			return BigInt( 0 );
		}
	}

	/**
	 *	@param str	{string} e.g.: "111111", "1", ...
	 */
	public static intFromAny( str : any ) : number
	{
		try
		{
			return parseInt( String( str ) );
		}
		catch ( err )
		{
			return 0;
		}
	}

	/**
	 *	@param str	{string} e.g.: "111111", "1", ...
	 */
	public static intFromString( str : string ) : number
	{
		try
		{
			return parseInt( str );
		}
		catch ( err )
		{
			return 0;
		}
	}

	/**
	 *	@param decimalNumber	{number}
	 *	@param withoutHead	{boolean}
	 *	@returns { string | null }
	 */
	public static decimalNumberToHex( decimalNumber : number, withoutHead ?: boolean )
	{
		if ( ! TypeUtil.isNumeric( decimalNumber ) )
		{
			return null;
		}

		const hexString : string = decimalNumber.toString(16 );
		return withoutHead ? hexString : `0x${ hexString }`;
	}
}
