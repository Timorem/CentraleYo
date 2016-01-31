/**
 * Created by Thomas on 31/01/2016.
 */
App.info({
    id: 'com.centraleyo',
    name: 'Centrale Yo',
    description: 'L\'Application de la NEB',
    author: 'Centrale Yo (INC 07)',
    email: 'thomas.walter@student.ecp.fr',
    website: 'http://centraleyo.meteor.com'
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');