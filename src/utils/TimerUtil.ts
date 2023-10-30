import _ from 'lodash';

/**
 * 	@class
 */
export class TimerUtil
{
	/**
	 *	@param delayInMillisecond	{number}
	 *	@returns {Promise<boolean>}
	 */
	static waitForDelay( delayInMillisecond : number )
	{
		return new Promise( ( resolve, reject ) =>
		{
			try
			{
				if ( delayInMillisecond < 0 )
				{
					return reject( `invalid delayInMillisecond` );
				}
				setTimeout( () =>
				{
					resolve( true );

				}, delayInMillisecond );
			}
			catch ( err )
			{
				reject( err );
			}
		} );
	}

	/**
	 *	@param pfnCondition		{function}
	 *	@param intervalInMillisecond	{number}
	 *	@returns {Promise<boolean>}
	 */
	static waitUntilCondition( pfnCondition : () => boolean, intervalInMillisecond : number )
	{
		return new Promise( ( resolve, reject ) =>
		{
			try
			{
				if ( ! _.isFunction( pfnCondition ) )
				{
					return reject( `invalid pfnCondition` );
				}

				const pfnCheckCondition = () =>
				{
					if ( pfnCondition() )
					{
						resolve( true );
					}
					else
					{
						//	check the condition every 100 milliseconds
						let timeout = 100;
						if ( _.isNumber( intervalInMillisecond ) && intervalInMillisecond > 0 )
						{
							timeout = intervalInMillisecond;
						}
						setTimeout( pfnCheckCondition, timeout );
					}
				};

				pfnCheckCondition();
			}
			catch ( err )
			{
				reject( err );
			}
		} );
	}
}
