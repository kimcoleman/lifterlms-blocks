/**
 * Settings used by the block visibility component
 *
 * @since [version]
 * @version [version]
 */

// WP deps.
import { __ } from '@wordpress/i18n';

/**
 * Settings value -> label map.
 *
 * @type {Object}
 */
const settings = {
	all: __( 'everyone', 'lifterlms' ),
	enrolled: __( 'enrolled users', 'lifterlms' ),
	not_enrolled: __( 'non-enrolled users or visitors', 'lifterlms' ),
	logged_in: __( 'logged in users', 'lifterlms' ),
	logged_out: __( 'logged out users', 'lifterlms' ),
};

/**
 * Retrieve the label for a single setting value
 *
 * @since [version]
 *
 * @param {string} setting Setting value.
 * @return {string} Setting label.
 */
export const getSetting = ( setting ) => settings[ setting ] || setting;

/**
 * Array of settings options as used by a select control
 *
 * @since [version]
 *
 * @return {Object[]} Array of objects to be passed into the options property for a select control.
 */
export const options = Object.keys( settings ).map( ( key ) => ( {
	label: settings[ key ],
	value: key,
} ) );
