import { expect } from "@jest/globals";
import { ProcessUtil } from "../../src/utils/ProcessUtil";

const originalArgv = process.argv;

/**
 *	unit test
 */
describe( "ProcessUtil Test", () =>
{
	beforeAll( async () =>
	{
	} );
	afterAll( async () =>
	{
	} );
	beforeEach( () =>
	{
		process.argv = [
			'/Users/x/.nvm/versions/node/v18.17.1/bin/node',
			'/Users/x/denetwork/js-denetwork-utils/src/main.js',
			'--port',
			'1234',
			'--peer',
			'abc'
		];
		process.env[ `AGE` ] = `20`;
		process.env[ `SITE` ] = `null`;
		process.env[ `WEB` ] = `NULL`;
		process.env[ `NET` ] = `Null`;
	} );
	afterEach( () =>
	{
		process.argv = originalArgv;
	} );

	describe( "getParamStringValue", () =>
	{
		it( "should get value from argv", async () =>
		{
			const portString : string | undefined = ProcessUtil.getParamStringValue( 'port' );
			expect( portString ).toBe( '1234' );

			const peerString : string | undefined = ProcessUtil.getParamStringValue( 'peer' );
			expect( peerString ).toBe( 'abc' );

			const portNumber : number | undefined = ProcessUtil.getParamIntValue( 'port' );
			expect( portNumber ).toBe( 1234 );

			const defaultString : string | undefined = ProcessUtil.getParamStringValue( 'username', '-' );
			expect( defaultString ).toBe( '-' );
		} );

		it( "should get value from argv and ENV", async () =>
		{
			const portString : string | undefined = ProcessUtil.getParamStringValue( 'AGE' );
			expect( portString ).toBe( '20' );

			const portNumber : number | undefined = ProcessUtil.getParamIntValue( 'AGE' );
			expect( portNumber ).toBe( 20 );

			const siteString : string | undefined = ProcessUtil.getParamStringValue( 'SITE' );
			expect( siteString ).toBe( '' );

			const webString : string | undefined = ProcessUtil.getParamStringValue( 'WEB' );
			expect( webString ).toBe( '' );

			const netString : string | undefined = ProcessUtil.getParamStringValue( 'NET' );
			expect( netString ).toBe( '' );
		} );
	} );
} );
