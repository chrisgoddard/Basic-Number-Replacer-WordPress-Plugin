<?php

/*
 * Plugin Name: Number Replacer
 * Plugin URI: http://www.odddogmedia.com/
 * Description: Source based number replacer
 * Version: 0.1
 * Author: Chris Goddard
 * Author URI: http://www.odddogmedia.com
 *
 */

if (!defined('NUMBER_PATH')) define('NUMBER_PATH', trailingslashit(plugin_dir_path(__FILE__)) . 'inc/');
if (!defined('NUMBER_URL')) define('NUMBER_URL', trailingslashit(plugin_dir_url(__FILE__)) . 'inc/');

class NumberReplacer
{


	private static $instance = false;

	function init()
	{
		if (null == self::$instance) {
			self::$instance = new self;
		}
		return self::$instance;
	}


	private function __construct()
	{

		add_action('after_setup_theme', array($this, 'options_page') );

		add_action('wp_enqueue_scripts', array($this, 'front_end_scripts') );

		add_action('wp_footer', array($this, 'footer_config'));

	}


	function options_page()
	{

		if ( function_exists('acf_add_options_sub_page') ) {
			acf_add_options_sub_page( 'Call Tracking' );
		}
		
		if(function_exists("register_field_group"))
		{
			register_field_group(array (
				'id' => 'acf_tracking-numbers',
				'title' => 'Tracking Numbers',
				'fields' => array (
					array (
						'key' => 'field_531124f2ec22f',
						'label' => 'Campaigns',
						'name' => 'campaigns',
						'type' => 'repeater',
						'sub_fields' => array (
							array (
								'key' => 'field_53112529ec230',
								'label' => 'Campaign Name',
								'name' => 'campaign_name',
								'type' => 'text',
								'required' => 1,
								'column_width' => '',
								'default_value' => '',
								'placeholder' => '',
								'prepend' => '',
								'append' => '',
								'formatting' => 'html',
								'maxlength' => '',
							),
							array (
								'key' => 'field_5311254dec231',
								'label' => 'Campaign Slug',
								'name' => 'campaign_slug',
								'type' => 'text',
								'required' => 1,
								'column_width' => '',
								'default_value' => '',
								'placeholder' => '',
								'prepend' => '',
								'append' => '',
								'formatting' => 'html',
								'maxlength' => '',
							),
							array (
								'key' => 'field_531128106466e',
								'label' => 'Tracking Numbers',
								'name' => 'tracking_lines',
								'type' => 'repeater',
								'column_width' => '',
								'sub_fields' => array (
									array (
										'key' => 'field_531128276466f',
										'label' => 'Network',
										'name' => 'network',
										'type' => 'select',
										'required' => 1,
										'column_width' => '',
										'choices' => array (
											'' => '--select--',
											'google' => 'Google',
											'bing' => 'Bing',
											'facebook' => 'Facebook',
											'twitter' => 'Twitter',
										),
										'default_value' => '',
										'allow_null' => 0,
										'multiple' => 0,
									),
									array (
										'key' => 'field_5311283f64670',
										'label' => 'Tracking Number',
										'name' => 'tracking_number',
										'type' => 'text',
										'column_width' => '',
										'default_value' => '',
										'placeholder' => '',
										'prepend' => '',
										'append' => '',
										'formatting' => 'html',
										'maxlength' => '',
									),
								),
								'row_min' => '',
								'row_limit' => '',
								'layout' => 'row',
								'button_label' => 'Add Tracking Number',
							),
						),
						'row_min' => '',
						'row_limit' => '',
						'layout' => 'table',
						'button_label' => 'Add Campaign',
					),
					array (
						'key' => 'field_531125f44b101',
						'label' => 'Replacement Settings',
						'name' => 'replacement_settings',
						'type' => 'select',
						'choices' => array (
							'all' => 'All Numbers',
							'selector' => 'Selector',
						),
						'default_value' => '',
						'allow_null' => 0,
						'multiple' => 0,
					),
					array (
						'key' => 'field_5311266d4b102',
						'label' => 'Selector Class',
						'name' => 'selector_class',
						'type' => 'text',
						'conditional_logic' => array (
							'status' => 1,
							'rules' => array (
								array (
									'field' => 'field_531125f44b101',
									'operator' => '==',
									'value' => 'selector',
								),
							),
							'allorany' => 'all',
						),
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'formatting' => 'html',
						'maxlength' => '',
					),
				),
				'location' => array (
					array (
						array (
							'param' => 'options_page',
							'operator' => '==',
							'value' => 'acf-options-call-tracking',
							'order_no' => 0,
							'group_no' => 0,
						),
					),
				),
				'options' => array (
					'position' => 'normal',
					'layout' => 'default',
					'hide_on_screen' => array (
					),
				),
				'menu_order' => 0,
			));
		}

	}


	function sanitize_phone_number($phone_number, $reverse = false)
	{
		if ($reverse) {
			return preg_replace('/([0-9]{3})(?:.*)([0-9]{3})(?:.*)([0-9]{4})(?:.*)/', '$1$2$3', $phone_number);

		} else {
			return preg_replace('/([0-9]{3})(?:.*)([0-9]{3})(?:.*)([0-9]{4})(?:.*)/', '$1.$2.$3', $phone_number);
		}


	}


	function front_end_scripts()
	{
		wp_enqueue_script('numbers', NUMBER_URL . 'numbers.js', array(), '1.0', true);
	}


	function admin_scripts()
	{

	}


	function footer_config()
	{

		$campaigns = get_field('campaigns', 'options');

		if($campaigns):

		foreach ($campaigns as $campaign) {

			$numbers = array();

			foreach ($campaign['tracking_lines'] as $line) {

				$numbers[$line['network']] = $this->sanitize_phone_number($line['tracking_number']);

			}

			$referenceobject[$campaign['campaign_slug']] = $numbers;


		}

?>
		<!-- Number Replacer Config -->
		<script>
		var campaigns = <?php echo json_encode($referenceobject); ?>;
		var selector = <?php if (get_field('replacement_settings', 'option') === 'all') {

			echo 0;

		} else {
			echo '"';
			echo get_field('selector_class', 'option');
			echo '";';

		} ?>
		</script>
		<?php
		
		endif;

	}
}


NumberReplacer::init();
