<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function slider_block_cgb_block_assets() { // phpcs:ignore
    // Register block editor script for backend.
    wp_register_script(
        'slider_block-cgb-block-js', // Handle.
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
        null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
        true // Enqueue the script in the footer.
    );

    // Register block styles for both frontend + backend.
    wp_register_style(
        'slider_block-cgb-style-css', // Handle.
        plugins_url( 'src/block/editor.css', __FILE__), // Block style CSS.
        is_admin() ? array('wp-edit-blocks') : null, // Dependency to include the CSS after it.
        null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
    );

    // Register block styles for frontend.
    wp_register_style(
        'slider_block-cgb-block-frontend-style', // Handle.
        plugins_url( 'src/block/style.css', __FILE__), // Block editor CSS.
        array(),
        null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	wp_enqueue_script(
		'slider_block-front-js',
		plugins_url('build/front.js', __FILE__),
		array(),
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'src/slider/front.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

    // WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
    // wp_localize_script(
    // 	'slider_block-cgb-block-js',
    // 	'cgbGlobal', // Array containing dynamic data for a JS Global.
    // 	[
    // 		'pluginDirPath' => plugin_dir_path( __DIR__ ),
    // 		'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
    // 		// Add more data here that you want to access from `cgbGlobal` object.
    // 	]
    // );

    /**
     * Register Gutenberg block on server-side.
     *
     * Register the block on server-side to ensure that the block
     * scripts and styles for both frontend and backend are
     * enqueued when the editor loads.
     *
     * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
     * @since 1.16.0
     */
    register_block_type(
        'cgb/block-slider-block', array(
            'style'         => 'slider_block-cgb-block-frontend-style',
            'editor_script' => 'slider_block-cgb-block-js',
            'editor_style'  => 'slider_block-cgb-block-editor-css',
        )
    );
}

add_action( 'init', 'slider_block_cgb_block_assets' );
