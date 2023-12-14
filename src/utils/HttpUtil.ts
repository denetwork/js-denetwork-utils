import _ from "lodash";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosProxyConfig, AxiosHeaders } from 'axios';

/**
 * 	models
 */
export enum HttpUtilMethods
{
	GET = "GET",
	HEAD = "HEAD",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	OPTIONS = "OPTIONS",
	PATCH = "PATCH",
	PURGE = "PURGE",
	LINK = "LINK",
	UNLINK = "UNLINK",
}

export type HttpUtilMilliseconds = number;

export const HttpUtilDefaultTimeout : HttpUtilMilliseconds	= 5 * 60 * 1000;	//	5 minutes
export const HttpUtilDefaultAccept : string	= 'application/json';

export interface HttpUtilProxy extends AxiosProxyConfig
{
}

export interface HttpUtilHeaderObject
{
	[ key: string ] : string | string[] | number | boolean | null;
}
export interface HttpUtilOptions
{
	url : string,				//	url
	method ?: HttpUtilMethods | string;	//	method
	timeout? : HttpUtilMilliseconds;	//	timeout in milliseconds
	data? : any;				//	post data
	headers? : HttpUtilHeaderObject;	//	http headers
	proxy?: HttpUtilProxy;			//	proxy
}

export interface HttpUtilResponse
{
	status ?: number;
	statusText ?: string;
	headers ?: any;
	data ?: any;
}

/**
 * 	@class HttpUtil
 */
export class HttpUtil
{
	public static isValidMethod( value: any ) : boolean
	{
		if ( _.isString( value ) &&
			! _.isEmpty( value ) )
		{
			return Object.values( HttpUtilMethods ).includes( value.toUpperCase() as HttpUtilMethods );
		}

		return false;
	}

	public static isValidUrl( value : any ) : boolean
	{
		const urlRegex = /^(http|https):\/\/[^ "]+$/;
		return _.isString( value ) && ! _.isEmpty( value ) && urlRegex.test( value );
	}

	public static isValidTimeout( value : any ) : boolean
	{
		return _.isNumber( value ) && value > 0;
	}

	public static head( options : HttpUtilOptions ) : Promise< HttpUtilResponse | null >
	{
		return this.request( { ...options, method : HttpUtilMethods.HEAD } );
	}

	public static get( options : HttpUtilOptions ) : Promise< HttpUtilResponse | null >
	{
		return this.request( { ...options, method : HttpUtilMethods.GET } );
	}

	public static post( options : HttpUtilOptions ) : Promise< HttpUtilResponse | null >
	{
		return this.request( { ...options, method : HttpUtilMethods.POST } );
	}

	public static put( options : HttpUtilOptions ) : Promise< HttpUtilResponse | null >
	{
		return this.request( { ...options, method : HttpUtilMethods.PUT } );
	}

	public static patch( options : HttpUtilOptions ) : Promise< HttpUtilResponse | null >
	{
		return this.request( { ...options, method : HttpUtilMethods.PATCH } );
	}

	public static delete( options : HttpUtilOptions ) : Promise< HttpUtilResponse | null >
	{
		return this.request( { ...options, method : HttpUtilMethods.DELETE } );
	}

	public static request( options : HttpUtilOptions ) : Promise< HttpUtilResponse | null >
	{
		return new Promise( async ( resolve, reject ) =>
		{
			try
			{
				if ( ! options )
				{
					return reject( `invalid options` );
				}
				if ( ! this.isValidMethod( options.method ) )
				{
					return reject( `invalid options.method` );
				}
				if ( ! this.isValidUrl( options.url ) )
				{
					return reject( `invalid options.url` );
				}

				//	config request options of Axios.
				//	data type of .data was set to any
				let axiosConfig: AxiosRequestConfig<any> = {
					method: options.method,
					url: options.url,
					timeout : this.isValidTimeout( options.timeout ) ? options.timeout : HttpUtilDefaultTimeout,
				};
				if ( _.isObject( options.headers ) && ! _.isEmpty( options.headers ) )
				{
					axiosConfig.headers = options.headers;
				}
				if ( _.isObject( options.data ) && ! _.isEmpty( options.data ) )
				{
					axiosConfig.data = options.data;
				}
				if ( _.isObject( options.proxy ) && ! _.isEmpty( options.proxy ) )
				{
					axiosConfig.proxy = options.proxy;
				}

				//	send request
				const axiosRes: AxiosResponse = await axios( axiosConfig );
				if ( axiosRes )
				{
					const response : HttpUtilResponse = {
						status : axiosRes.status,
						statusText : axiosRes.statusText,
						headers : axiosRes.headers,
						data : axiosRes.data,
					};
					return resolve( response );
				}

				resolve( null );
			}
			catch ( err )
			{
				reject( err );
			}
		});
	}
}
