<?php
date_default_timezone_set("America/Los_Angeles");

// Import Evernote
// Import Google Photos
// Import Scraping library (headless browser?)
require __DIR__ . '/vendor/autoload.php';

// Import env

// Open ATK
// use Goutte\Client;
// $client = new Client();
// $crawler = $client->request('GET', 'https://www.americastestkitchen.com/recipes/9067-scallion-pancakes-with-dipping-sauce');
// print_r($crawler);

use Browser\Casper;

$casper = new Casper();

// forward options to phantomJS
// for example to ignore ssl errors
$casper->setOptions([
    'ignore-ssl-errors' => 'yes',
    'engine' => 'slimerjs' //to see crawler in action
]);

// $uri = "https://www.americastestkitchen.com/recipes/9067-scallion-pancakes-with-dipping-sauce";
$uri = "http://www.google.com";

// navigate to google web page
$casper->start($uri);

if($casper->waitForText('Watch TV Clip', 3000)){
	echo("Found Watch TV Clip\n");
}
// $casper->click('h3.r a');
// $casper->run();
var_dump($casper->getOutput());
// print_r($casper);


// ffmpeg -i "https://cdnapisec.kaltura.com/p/1445801/sp/144580100/playManifest/entryId/1_oighttmp/flavorIds/1_hoesme8n,1_nlql2grc,1_w58zor1a,1_0p8idx5h/format/applehttp/protocol/https/a.m3u8?referrer=aHR0cHM6Ly93d3cuYW1lcmljYXN0ZXN0a2l0Y2hlbi5jb20=&amp;playSessionId=4f5021b7-249e-fa28-12b9-ab0d0a522439&amp;clientTag=html5:v2.53.2&amp;uiConfId=35515711" -preset ultrafast vid_compressed.mp4

// Specify season(s)
// Grab Title, Ingredients, Procedure, Notes, etc. to Recipe object

// Check to see if video available
// Click on the "Watch Video" link
// $link = $crawler->selectLink('Security Advisories')->link();
// $crawler = $client->click($link);

// If video available, slurp it up, save to HD
// Upload video from HD to Google Photos
// If GP returns a link, add link to recipe object
// Delete video from HD