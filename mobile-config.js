/**
 * Created by Thomas on 31/01/2016.
 */
App.info({
    id: 'com.centraleyo',
    name: 'Centrale Yo',
    description: 'L\'Application de la NEB',
    author: 'Centrale Yo (INC 07)',
    email: 'thomas.walter@student.ecp.fr',
    website: 'http://centraleyo.via.ecp.fr'
});

// Set up resources such as icons and launch screens.
App.icons({
    'iphone': 'icons/icon-hdpi.png',
    'iphone_2x': 'icons/icon-xxhdpi.png',

    // Android
    'android_mdpi': 'icons/icon-mdpi.png',
    'android_hdpi': 'icons/icon-hdpi.png',
    'android_xhdpi': 'icons/icon-xhdpi.png'
});


// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');