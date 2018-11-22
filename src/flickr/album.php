<?php

$configFile = dirname(__FILE__) . '/config.php';


if (!isset($_GET['photoset_id'])) {
  die("Photoset ID not set");
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
$callback = sprintf('%s://%s:%d%s?%s',
    (@$_SERVER['HTTPS'] == "on") ? 'https' : 'http',
    $_SERVER['SERVER_NAME'],
    $_SERVER['SERVER_PORT'],
    $_SERVER['SCRIPT_NAME'],
    $_SERVER['QUERY_STRING']
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
    'photoset_id' => $_GET['photoset_id'],
);

$response = $flickr->call('flickr.photosets.getPhotos', $parameters);

if( array_key_exists('photoset',$response)) {
  $photos = ($response['photoset']); ?>
  <!-- <button onclick="window.opener.document.querySelector('.card--image-container').style.backgroundImage = 'url(https://farm5.staticflickr.com/4532/24515881198_4a8e1a69d2_k.jpg)';window.close();">magic data passback</button> -->
  <html>
    <head>
      <title>Select an image</title>
      <style>
      #photos {
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
      }
      #photos li {
        list-style-type: none;
        float: left;
        margin: 0;
        padding: 1em;
        flex: 1 1;
      }
      #photos img {
        display: block;
      }
      </style>
    </head>
    <body>
      <ul id="photos">
          <?php foreach ($photos['photo'] as $photo) { ?>
              <li>
                <a href="image.php?photo_id=<?= $photo['id'] ?>">
                  <img class="image-thumb" data-imageid="<?= $photo['id'] ?>" src="http://farm<?= $photo['farm'] ?>.staticflickr.com/<?= $photo['server'] ?>/<?= $photo['id'] ?>_<?= $photo['secret'] ?>_q.jpg"/>
                </a>
              </li>
          <?php } ?>
      </ul>
    </body>
  </html>
<?php }

else {
  echo 'nowt to show you. Maybe you need to <a href="signin.php">Sign in</a>';
}




?>
