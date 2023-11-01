import { FetchRequest, FetchResponse } from 'ethers'
import { TypeUtil } from "./TypeUtil";

export const FetchMethods : Array<string> = [
	"GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"
];
export const FetchDefaultTimeout : number	= 5 * 60 * 1000;	//	5 minutes
export const FetchDefaultAccept : string	= 'application/json';

export interface FetchHeaderItem
{
	key : string;
	value : string;
}
export interface FetchOptions
{
	url : string,				//	url
	timeout? : number;			//	timeout in milliseconds
	accept? : string;			//	default 'accept: application/json'
	body? : any;				//	null | string | Object | Uint8Array
	headers? : Array<FetchHeaderItem>;	//	headers
}

export type FetchOptionsSortDirection = "asc" | "desc";

/**
 * 	@interface
 */
export interface FetchListOptions
{
	//	the integer page number, if pagination is enabled
	page? : number;

	//	the number of transactions displayed per page
	pageSize? : number;

	//	the sorting preference, use asc to sort by ascending and desc to sort by descending
	sort? : FetchOptionsSortDirection;

	//	key for pagination.
	//	If more results are available, a pageKey will be returned in the response.
	//	Pass back the pageKey as a param to fetch the next page of results.
	pageKey? : string;

	//	pageKey of fromAddress list
	fromPageKey? : string;

	//	pageKey of toAddress list
	toPageKey? : string;
}


/**
 * 	@class
 */
export class FetchUtil
{
	public static isValidMethod( method : any ) : boolean
	{
		return TypeUtil.isNotEmptyString( method ) &&
			FetchMethods.includes( method.trim().toUpperCase() );
	}

	public static isValidTimeout( timeout : any ) : boolean
	{
		return TypeUtil.isNumeric( timeout ) && timeout > 0;
	}

	public static isValidOptions( options : any )
	{
		return TypeUtil.isNotNullObjectWithKeys( options, [ 'url' ] ) &&
			TypeUtil.isValidUrl( options.url );
	}

	public static get defaultPage()
	{
		return 1;
	}

	public static getSafePage( page : any, defaultPage ?: number )
	{
		if ( TypeUtil.isNumeric( page ) )
		{
			return page > 0 ? page : ( TypeUtil.isNumeric( defaultPage ) ? defaultPage : this.defaultPage );
		}

		return this.defaultPage;
	}

	public static get defaultPageSize()
	{
		return 10;
	}

	public static getSafePageSize( pageSize : any, defaultPageSize ?: number )
	{
		if ( TypeUtil.isNumeric( pageSize ) )
		{
			return pageSize > 0 ? pageSize : ( TypeUtil.isNumeric( defaultPageSize ) ? defaultPageSize : this.defaultPageSize );
		}

		return this.defaultPageSize;
	}

	public static get defaultSort()
	{
		return 'desc';
	}

	public static getSafeSort( sort : any )
	{
		if ( TypeUtil.isNotEmptyString( sort ) )
		{
			if ( [ 'asc', 'desc' ].includes( sort.trim().toLowerCase() ) )
			{
				return sort.trim().toLowerCase();
			}
		}

		return this.defaultSort;
	}


	public static async getRequest( options : FetchOptions ) : Promise<FetchResponse>
	{
		return FetchUtil.sendRequest( "GET", options );
	}

	public static async postRequest( options : FetchOptions ) : Promise<FetchResponse>
	{
		return FetchUtil.sendRequest( "POST", options );
	}

	public static async sendRequest( method : string, options : FetchOptions ) : Promise<FetchResponse>
	{
		return new Promise( async ( resolve, reject ) =>
		{
			try
			{
				if ( ! FetchUtil.isValidOptions( options ) )
				{
					return reject( `invalid options` );
				}

				//	...
				const req : FetchRequest = new FetchRequest( options.url );
				req.timeout = FetchUtil.isValidTimeout( options?.timeout ) && options?.timeout ? options?.timeout : FetchDefaultTimeout;
				req.method	= FetchUtil.isValidMethod( method ) ? method : "GET";
				req.body	= options?.body;
				if ( ! options.accept )
				{
					options.accept = FetchDefaultAccept;
				}
				req.setHeader( "accept", options.accept );

				if ( Array.isArray( options.headers ) && options.headers.length > 0 )
				{
					for ( const header of options.headers )
					{
						if ( ! TypeUtil.isNotEmptyString( header.key ) )
						{
							continue;
						}

						req.setHeader( header.key, header.value );
					}
				}
				// console.log( req.toString() );
				const resp : FetchResponse = await req.send();
				resolve( resp );
			}
			catch ( err )
			{
				reject( err );
			}
		});
	}
}
