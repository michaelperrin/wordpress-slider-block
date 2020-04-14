<?php
/**
 * Plugin Name: Slider Block
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Slider Block – A plugin to easily create carousels.
 * Author: Michaël Perrin
 * Author URI: https://www.michaelperrin.fr
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
