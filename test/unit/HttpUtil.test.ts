import { expect } from "@jest/globals";
import { HttpUtil, HttpUtilMethods, HttpUtilOptions, HttpUtilResponse } from "../../src/utils/HttpUtil";
import _ from "lodash";

/**
 *	unit test
 */
describe( "HttpUtil Test", () =>
{
	beforeAll( async () =>
	{
	} );
	afterAll( async () =>
	{
	} );

	describe( "HttpPost", () =>
	{
		it( "should test HttpUtil.isValidMethod", () =>
		{
			const allMethods = Object.values( HttpUtilMethods );
			expect( Array.isArray( allMethods ) ).toBeTruthy();
			expect( allMethods.length ).toBeGreaterThan( 0 );
			for ( const method of allMethods )
			{
				expect( HttpUtil.isValidMethod( method.toLowerCase() ) ).toBeTruthy();
				expect( HttpUtil.isValidMethod( method.toUpperCase() ) ).toBeTruthy();
			}

			expect( HttpUtil.isValidMethod( "A" ) ).toBeFalsy();
		});

		it( "should send HTTP Get request", async () =>
		{
			const httpOptions : HttpUtilOptions = {
				url : `https://jsonplaceholder.typicode.com/posts/1`,
			};
			const response : HttpUtilResponse | null = await HttpUtil.get( httpOptions );
			expect( response ).not.toBeNull();
			expect( response ).toHaveProperty( `status` );
			expect( response ).toHaveProperty( `statusText` );
			expect( response ).toHaveProperty( `headers` );
			expect( response ).toHaveProperty( `data` );
			if ( response )
			{
				expect( response.status ).toBeGreaterThanOrEqual( 200 );
				expect( response.status ).toBeLessThanOrEqual( 202 );
				//
				//	data: {
				//         userId: 1,
				//         id: 1,
				//         title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
				//         body: 'quia et suscipit\n' +
				//           'suscipit recusandae consequuntur expedita et cum\n' +
				//           'reprehenderit molestiae ut ut quas totam\n' +
				//           'nostrum rerum est autem sunt rem eveniet architecto'
				//       }
				//
				expect( response.data ).toHaveProperty( `userId` );
				expect( response.data ).toHaveProperty( `id` );
				expect( response.data ).toHaveProperty( `title` );
				expect( _.isNumber( response.data.userId ) ).toBeTruthy();
				expect( response.data.userId ).toBeGreaterThan( 0 );
				expect( _.isNumber( response.data.id ) ).toBeTruthy();
				expect( response.data.id ).toBeGreaterThan( 0 );
				expect( _.isString( response.data.title ) ).toBeTruthy();
			}
		} );

		it( "should send HTTP Post request", async () =>
		{
			const httpOptions : HttpUtilOptions = {
				url : `https://jsonplaceholder.typicode.com/posts`,
			};
			const response : HttpUtilResponse | null = await HttpUtil.post( httpOptions );
			expect( response ).not.toBeNull();
			expect( response ).toHaveProperty( `status` );
			expect( response ).toHaveProperty( `statusText` );
			expect( response ).toHaveProperty( `headers` );
			expect( response ).toHaveProperty( `data` );
			if ( response )
			{
				expect( response.status ).toBeGreaterThanOrEqual( 200 );
				expect( response.status ).toBeLessThanOrEqual( 202 );

				//	data: { id: 101 }
				expect( response.data ).toHaveProperty( `id` );
				expect( _.isNumber( response.data.id ) ).toBeTruthy();
				expect( response.data.id ).toBeGreaterThan( 0 );
			}
		} );

		// it( "should send HTTP Post request with proxy", async () =>
		// {
		// 	const httpOptions : HttpUtilOptions = {
		// 		url : `https://jsonplaceholder.typicode.com/posts`,
		//
		// 		//	export https_proxy=http://127.0.0.1:6152;export http_proxy=http://127.0.0.1:6152;export all_proxy=socks5://127.0.0.1:6153
		// 		proxy : {
		// 			protocol: `http`,
		// 			host: `127.0.0.1`,
		// 			port: 6152,
		// 		}
		// 	};
		// 	const response : HttpUtilResponse | null = await HttpUtil.post( httpOptions );
		// 	expect( response ).not.toBeNull();
		// 	expect( response ).toHaveProperty( `status` );
		// 	expect( response ).toHaveProperty( `statusText` );
		// 	expect( response ).toHaveProperty( `headers` );
		// 	expect( response ).toHaveProperty( `data` );
		// 	if ( response )
		// 	{
		// 		expect( response.status ).toBeGreaterThanOrEqual( 200 );
		// 		expect( response.status ).toBeLessThanOrEqual( 202 );
		//
		// 		//	data: { id: 101 }
		// 		expect( response.data ).toHaveProperty( `id` );
		// 		expect( _.isNumber( response.data.id ) ).toBeTruthy();
		// 		expect( response.data.id ).toBeGreaterThan( 0 );
		// 	}
		// } );
	} );
} );
