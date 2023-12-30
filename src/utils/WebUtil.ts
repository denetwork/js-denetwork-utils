import _ from "lodash";

export interface WebResponseObject
{
	/**
	 * 	@description status
	 */
	status : number;

	/**
	 * 	@description version
	 */
	version	: string;

	/**
	 *	@description timestamp UTC
	 */
	ts	: number;

	/**
	 * 	@description time used
	 */
	tu	: number;

	/**
	 * 	@description error description
	 */
	error	: string | null | undefined;

	/**
	 * 	@description data
	 */
	data	: any;
}


export class WebUtil
{
	/**
	 *	get response object
	 *
	 *	@param  status		{number}
	 *	@param	data		{any}
	 *	@param	options		{any}
	 *	@return	{ WebResponseObject }
	 */
	static getResponseObject( status : number, data : any, options ?: any ) : WebResponseObject
	{
		if ( ! _.isNumber( status ) )
		{
			status = 0;
		}

		let errorString = null;
		if ( _.isObject( options ) )
		{
			const errorAny : any = ( options as { error : any } )?.error;
			if ( _.isObject( errorAny ) )
			{
				errorString = _.get( options, `error.message` );
				errorString = _.isString( errorString ) ? errorString : null;
			}
			else if ( _.isString( errorAny ) )
			{
				errorString = errorAny;
			}
			else
			{
				errorString = JSON.stringify( errorAny );
			}
		}

		const timeUsed : number = ( options && options.tu ) ? options.tu : 0;
		return {
			status  : status,		//	0 unset, 200, 404, 500 ...
			version	: `1.0`,		//	version
			ts	: new Date().getTime(),	//	timestamp UTC
			tu	: timeUsed,		//	time used
			error	: errorString,		//	error description
			data	: data,			//	data
		};
	}
}
