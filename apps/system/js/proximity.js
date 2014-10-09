window.proximity = {

  wifiProximity: function(ssid, callback) {
    setTimeout(function() {
      this.listWifiNetworks(function(networks) {
        var network = networks.filter(function(network) {
          return network.ssid.toLowerCase() === ssid.toLowerCase();
        }).pop();

        if (!network) {
          console.error('no ssid provided or network not found');
          if (callback) callback(null);
        }

        if (callback) callback(network.relSignalStrength);
      })
    }.bind(this), 2000);
  },

  listWifiNetworks: function(callback) {
    // Remember to enable wifi first!
    navigator.mozWifiManager.getNetworks().onsuccess = function() {
      var networks = this.result;
      if (callback) callback(this.result);
    };
  },

  enableWifi: function(callback) {
    navigator.mozSettings.createLock().set({
      'wifi.enabled': true
    }).onsuccess = callback;
  },

  turnOnHotspot: function(name) {
    this.enableWifi(function() {
      setTimeout(function() {
        navigator.mozSettings.createLock().set({
          'tethering.wifi.ssid': name,
          'tethering.wifi.security.type': 'open',
          'tethering.wifi.enabled': true
        })
      }, 5000);
    });
  },

  turnOffHotspot: function() {
    navigator.mozSettings.createLock().set({
      'tethering.wifi.enabled': false
    });
  }
};
