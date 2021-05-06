/**
 * Test Form post document sidebar
 *
 * @since 1.12.0
 * @version 1.12.0
 */

import {
	getAllBlocks,
	insertBlock,
	openDocumentSettingsSidebar,
	selectBlockByClientId,
} from '@wordpress/e2e-test-utils';

import {
	click,
	clickElementByText,
	toggleOpenRegistration,
} from '@lifterlms/llms-e2e-test-utils';

import {
	blockSnapshotMatcher,
	visitForm,
} from '../../util';

async function openFormSettingsPanel() {

	await clickElementByText( 'LifterLMS Form', '.components-button.edit-post-sidebar__panel-tab' );

	const isOpen = await page.$eval( '.llms-forms-doc-settings', el => el.classList.contains( 'is-opened' ) );

	if ( ! isOpen ) {
		await clickElementByText( 'Form Settings', '.components-panel .components-button' );
	}

}

async function getAllBlockNames() {
	const blocks = await getAllBlocks();
	return blocks.map( ( { name } ) => name );
}

describe( 'Admin/FormsDocSidebar', () => {

	describe( 'LocationDisplay', () => {

		it ( 'should display the location when open registration is disabled', async () => {

			await toggleOpenRegistration( false );

			page.once( 'dialog', async dialog => await dialog.accept() ); // Leave page without saving.

			await visitForm( 'Register' );
			await openFormSettingsPanel();

			expect( await page.$eval( '.llms-forms-doc-settings .components-panel__row', el => el.textContent ) ).toMatchSnapshot();

		} );

		it ( 'should display the location with a link when open registration is enabled', async () => {

			await toggleOpenRegistration( true );

			page.on( 'dialog', async dialog => await dialog.accept() ); // Leave page without saving.

			await visitForm( 'Register' );
			await openFormSettingsPanel();

			expect( await page.$eval( '.llms-forms-doc-settings .components-panel__row a', el => el.textContent ) ).toMatchSnapshot();

		} );

	} );

	describe( 'TemplateRevert', () => {

		it ( 'should allow a form to be reverted to the default layout', async () => {

			await visitForm( 'Register' );

			// Add a new block.
			await insertBlock( 'Paragraph' );
			await page.keyboard.type( 'Lorem ipsum' );

			// Remove the last field block on screen.
			let blocks = await getAllBlocks();
			const lastBlock = blocks[ blocks.length - 2 ];
			await page.evaluate( async ( clientId ) => {
				return wp.data.dispatch( 'core/block-editor' ).removeBlock( clientId );
			}, lastBlock.clientId );

			// Revert.
			await openFormSettingsPanel();
			await clickElementByText( 'Revert to Default', '.components-panel .components-button' );

			// Notice should display.
			await page.waitForSelector( '.components-notice.is-success' );
			expect( await page.$eval( '.components-notice.is-success .components-notice__content', el => el.innerHTML ) ).toMatchSnapshot();

			// Match block list.
			expect( await getAllBlockNames() ).toMatchSnapshot();

			// Undo the revert.
			await click( '.components-notice.is-success .components-notice__content button' );

			// Notice gets removed
			expect( await page.evaluate( () => document.querySelector( '.components-notice.is-success' ) ) ).toBeNull();

			// Changes before the revert should be found.
			expect( await getAllBlockNames() ).toMatchSnapshot();

		} );

	} );


} );
