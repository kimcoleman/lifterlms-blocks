/**
 * BLOCK: llms/form-field-user-address-country
 *
 * @since 1.6.0
 * @since 1.8.0 Updated lodash imports.
 * @since 1.12.0 Add data store support.
 */

// WP Deps.
import { __ } from '@wordpress/i18n';

// External Deps.
import { cloneDeep } from 'lodash';

// Internal Deps.
import { settings as countrySelectSettings } from './select-country';

/**
 * Block Name
 *
 * @type {string}
 */
const name = 'llms/form-field-user-address-country';

/**
 * Array of supported post types.
 *
 * @type {Array}
 */
const postTypes = [ 'llms_form' ];

/**
 * Is this a default or composed field?
 *
 * Composed fields serve specific functions (like the User Email Address field)
 * and are automatically added to the form builder UI.
 *
 * Default (non-composed) fields can be added by developers to perform custom functions
 * and are not registered as a block by default
 *
 * @type {string}
 */
const composed = true;

// Setup the field settings.
const settings = cloneDeep( countrySelectSettings );

settings.title = __( 'User Country', 'lifterlms' );
settings.description = __(
	"A special field used to collect a user's billing address country.",
	'lifterlms'
);

settings.supports.multiple = false; // Can only have a single email address field.

settings.supports.llms_field_inspector.id = false;
settings.supports.llms_field_inspector.name = false;
settings.supports.llms_field_inspector.required = false;
settings.supports.llms_field_inspector.match = false;
settings.supports.llms_field_inspector.storage = false;

settings.attributes.id.__default = 'llms_billing_country';
settings.attributes.label.__default = __( 'Country / Region', 'lifterlms' );
settings.attributes.name.__default = 'llms_billing_country';
settings.attributes.required.__default = true;
settings.attributes.placeholder.__default = '';

delete settings.transforms;

export { name, postTypes, composed, settings };
