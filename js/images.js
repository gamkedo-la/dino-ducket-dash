var allImages = [
	'images/decals.png',
	'images/ducket_particle.png',
	'images/ducket.png',

	'images/enemy_run.png',
	'images/enemy_telegraph.png',
	
	'images/menu_title.png',
	'images/animatedSplashScreen.png',
	
	'images/green_player_idle_facing_left.png',
	'images/green_player_idle_facing_right.png',

	'images/blue_player_idle_facing_left.png',
	'images/blue_player_idle_facing_right.png',

	'images/pinkish_player_idle_facing_left.png',
	'images/pinkish_player_idle_facing_right.png',

	'images/yellow_player_idle_facing_left.png',
	'images/yellow_player_idle_facing_right.png',
	
	'images/pterodactyl_sprite_facing_left.png',
	'images/pterodactyl_sprite_facing_right.png',

	'images/tile-sand-01.png',
	'images/UI_Anim.png',
	'images/SurpriseBox.png'
];
var imagesDownloaded = 0;
var images = {
	decals: {},
	ducket_particle: {},
	ducket: {},
	enemy_run: {},
	enemy_telegraph: {},
	menu_title: {},
	animated_splash:{},
	green_player_idle_facing_left: {},
	green_player_idle_facing_right: {},
	blue_player_idle_facing_left: {},
	blue_player_idle_facing_right: {},
	pink_player_idle_facing_left: {},
	pink_player_idle_facing_right: {},
	yellow_player_idle_facing_left: {},
	yellow_player_idle_facing_right: {},
	pterodactyl_sprite_facing_left: {},
	pterodactyl_sprite_facing_right: {},
	tile_sand_01: {},
	UI_Anim: {},
	SupriseBox: {}
};

function loadImages()
{
	const imagesKeys = Object.keys(images);

	for (var i=0; i<allImages.length; i++) {
		images[imagesKeys[i]] = new Image();
		images[imagesKeys[i]].onload = function()
		{
			gameState = 'input to launch';
			
		};
		
		images[imagesKeys[i]].src = allImages[i]; 
	}
}