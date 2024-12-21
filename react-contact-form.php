<?php
/**
 * Plugin Name: React Contact Form
 * Description: A modern contact form built with React
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: react-contact-form
 */

if (!defined('ABSPATH')) {
    exit;
}

function rcf_enqueue_scripts() {
    wp_enqueue_script('react', 'https://unpkg.com/react@18/umd/react.production.min.js', [], '18.0.0', true);
    wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', ['react'], '18.0.0', true);
    wp_enqueue_script('react-contact-form', plugin_dir_url(__FILE__) . 'dist/react-contact-form.js', ['react', 'react-dom'], '1.0.0', true);
    wp_enqueue_style('react-contact-form', plugin_dir_url(__FILE__) . 'dist/style.css', [], '1.0.0');
}
add_action('wp_enqueue_scripts', 'rcf_enqueue_scripts');

function rcf_shortcode() {
    return '<div id="react-contact-form"></div>';
}
add_shortcode('react_contact_form', 'rcf_shortcode');

function rcf_rest_api_init() {
    register_rest_route('react-contact-form/v1', '/submit', [
        'methods' => 'POST',
        'callback' => 'rcf_handle_submission',
        'permission_callback' => '__return_true'
    ]);
}
add_action('rest_api_init', 'rcf_rest_api_init');

function rcf_handle_submission($request) {
    $params = $request->get_params();
    
    $to = get_option('admin_email');
    $subject = 'New Contact Form Submission';
    $body = sprintf(
        "Name: %s\nEmail: %s\nPhone: %s\nMessage: %s",
        sanitize_text_field($params['name']),
        sanitize_email($params['email']),
        sanitize_text_field($params['phone']),
        sanitize_textarea_field($params['message'])
    );
    
    $headers = ['Content-Type: text/plain; charset=UTF-8'];
    
    $sent = wp_mail($to, $subject, $body, $headers);
    
    if ($sent) {
        return new WP_REST_Response(['message' => 'Message sent successfully'], 200);
    } else {
        return new WP_REST_Response(['message' => 'Failed to send message'], 500);
    }
}