<?php

$configFile = dirname(__FILE__) . '/config.php';


if (!isset($_GET['photo_id'])) {
  die("Photo ID not set");
}
if (file_exists($configFile))
{
    include $configFile;
}
else
{
    die("Please rename the config-sample.php file to config.php and add your Flickr API key and secret to it\n");
}

spl_autoload_register(function($className)
{
    $className = str_replace ('\\', DIRECTORY_SEPARATOR, $className);
    include (dirname(__FILE__) . '/src/' . $className . '.php');
});

use \DPZ\Flickr;

// Build the URL for the current page and use it for our callback
$callback = sprintf('%s://%s:%d%s',
    (@$_SERVER['HTTPS'] == "on") ? 'https' : 'http',
    $_SERVER['SERVER_NAME'],
    $_SERVER['SERVER_PORT'],
    $_SERVER['SCRIPT_NAME']
    );

$flickr = new Flickr($flickrApiKey, $flickrApiSecret, $callback);

if (!$flickr->authenticate('read'))
{
    die("Hmm, something went wrong...\n");
}

$userNsid = $flickr->getOauthData(Flickr::USER_NSID);
$userName = $flickr->getOauthData(Flickr::USER_NAME);
$userFullName = $flickr->getOauthData(Flickr::USER_FULL_NAME);

$parameters =  array(
    'photo_id' => $_GET['photo_id'],
);

$response = $flickr->call('flickr.photos.getSizes', $parameters);

if( array_key_exists('sizes',$response)) {
  foreach ($response['sizes']['size'] as $size) {
    if($size['label'] == 'Large 2048') { ?>
      <script>
      window.opener.document.querySelector('#imageFlickr').value = '/flickr/imageproxy.php?url=<?= $size['source'] ?>';
      window.opener.document.querySelector('#imageFlickr').dispatchEvent(new Event('input'));
      window.close();
      </script>
    <?php }
  }

}

else {
  echo 'nowt to show you. Maybe you need to <a href="signin.php">Sign in</a>';
}




?>
