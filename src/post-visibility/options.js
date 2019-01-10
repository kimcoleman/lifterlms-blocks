/**
 * Define LifterLMS Course and Membership Visibility Options
 *
 * @since   [version]
 * @version [version]
 */

// WP Deps.
const { __ } = wp.i18n;
const { applyFilters } = wp.hooks;

export const visibilityOptions = applyFilters( 'llms_blocks_post_visibility_options', [
	{
		value: 'catalog_search',
		label: __( 'Visible', 'lifterlms' ),
		info: __( 'Visible in the catalog and search results.', 'lifterlms' ),
	},
	{
		value: 'catalog',
		label: __( 'Catalog only', 'lifterlms' ),
		info: __( 'Only visible in the catalog.', 'lifterlms' ),
	},
	{
		value: 'search',
		label: __( 'Search only', 'lifterlms' ),
		info: __( 'Only visible in search results.', 'lifterlms' ),
	},
	{
		value: 'hidden',
		label: __( 'Hidden', 'lifterlms' ),
		info: __( 'Hidden from catalog and search results.', 'lifterlms' ),
	},
] );
