<?php
/**
 * Plugin Name:       CoachOS Booking 
 * Plugin URI:        https://amir9078.github.io/apps/wordpress
 * Description:       Embed your CoachOS Booking in Wordpress
 * Version:           0.1
 * Author:            amir9078.github.io, Inc.
 * Author URI:        https://amir9078.github.io
 * License:           MIT
 * License URI:       https://opensource.org/license/mit
 * Text Domain:       coachos-embed
 */

function coachos_shortcode( $atts, $content = null) {
global $post;extract(shortcode_atts(array(
'for' => $post->post_title,
), $atts));
if(empty($content)) $content='Embed CoachOS Booking';
// TODO: How to reuse embed-snippet export here?
return '<script>(function (C, A, L){let p=function (a, ar){a.q.push(ar);}; let d=C.document; C.Cal=C.Cal || function (){let cal=C.Cal; let ar=arguments; if (!cal.loaded){cal.ns={}; cal.q=cal.q || []; d.head.appendChild(d.createElement("script")).src=A; cal.loaded=true;}if (ar[0]===L){const api=function (){p(api, arguments);}; const namespace=ar[1]; api.q=api.q || []; typeof namespace==="string" ? (cal.ns[namespace]=api) && p(api, ar) : p(cal, ar); return;}p(cal, ar);};})(window, "https://amir9078.github.io/embed.js", "init"); Cal("init") </script> <script>Cal("inline",{calLink: '.$content.'});</script>';
}
add_shortcode('cal', 'coachos_shortcode');
