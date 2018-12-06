<?php
/**
 * Course syllabus block.
 *
 * @package  LifterLMS_Blocks/Abstracts
 * @since    1.0.0
 * @version  1.0.0
 *
 * @render_hook llms_lesson-progression-block_render
 */

defined( 'ABSPATH' ) || exit;

/**
 * Course syllabus block class.
 */
class LLMS_Blocks_Lesson_Progression_Block extends LLMS_Blocks_Abstract_Block {

	/**
	 * Block ID.
	 *
	 * @var string
	 */
	protected $id = 'lesson-progression';

	/**
	 * Is block dynamic (rendered in PHP).
	 *
	 * @var bool
	 */
	protected $is_dynamic = true;

	/**
	 * Add actions attached to the render function action.
	 *
	 * @param   array  $attributes Optional. Block attributes. Default empty array.
	 * @param   string $content    Optional. Block content. Default empty string.
	 * @return  void
	 * @since   1.0.0
	 * @version 1.0.0
	 */
	public function add_hooks( $attributes = array(), $content = '' ) {

		// Remove all the default LifterLMS template hooks.
		remove_action( 'lifterlms_single_lesson_after_summary', 'lifterlms_template_complete_lesson_link', 10 );

		add_action( $this->get_render_hook(), 'lifterlms_template_complete_lesson_link', 10 );

	}

	/**
	 * Retrieve custom block attributes.
	 * Necessary to override when creating ServerSideRender blocks.
	 *
	 * @return  array
	 * @since   1.0.0
	 * @version 1.0.0
	 */
	public function get_attributes() {
		return array_merge(
			parent::get_attributes(),
			array(
				'post_id' => array(
					'type'    => 'int',
					'default' => 0,
				),
			)
		);
	}

}

return new LLMS_Blocks_Lesson_Progression_Block();