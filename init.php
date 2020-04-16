<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package mp
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
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
function slider_block_mp_block_assets()
{
    // Register block editor script for backend.
    wp_register_script(
        'mp-slider-block-js', // Handle.
        plugins_url('build/index.js', __FILE__),
        ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
        null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
        true // Enqueue the script in the footer.
    );

    // Register block styles for both frontend + backend.
    wp_register_style(
        'mp-slider-block-style', // Handle.
        plugins_url('src/block/editor.css', __FILE__), // Block style CSS.
        is_admin() ? ['wp-edit-blocks'] : null, // Dependency to include the CSS after it.
        null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
    );

    // Register block styles for frontend.
    wp_register_style(
        'mp-slider-block-frontend-style',
        plugins_url('src/block/style.css', __FILE__),
        [],
        null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
    );

    wp_register_style(
        'mp-slider-block-swiper-style',
        plugins_url('node_modules/swiper/css/swiper.min.css', __FILE__),
        [],
        null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
    );

    wp_enqueue_script(
        'mp-slider-block-frontend-js',
        plugins_url('build/front.js', __FILE__),
        [],
        null, // filemtime( plugin_dir_path( __DIR__ ) . 'src/slider/front.build.js' ), // Version: filemtime — Gets file modification time.
        true // Enqueue the script in the footer.
    );

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
        'mp/block-slider-block', [
            'style'         => ['mp-slider-block-frontend-style', 'mp-slider-block-swiper-style'],
            'editor_script' => 'mp-slider-block-js',
            'editor_style'  => 'mp-slider-block-style',
        ]
    );
}

add_action('init', 'slider_block_mp_block_assets');
