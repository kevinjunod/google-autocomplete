import React, { PureComponent } from 'react';
import { Text, View, PermissionsAndroid, StyleSheet, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class AutoComplete extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      name: "",
      address: ""
    }
  }

  componentDidMount() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(() => {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    })
  }

  getAlamatLengkap = (data, details) => {
    this.setState({
      location: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }, nama: details.name, address: data.description
    });
  };

  render() {
    const { location, name, address } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ margin: 15, marginBottom: 30, flex: 2 }}>
          <GooglePlacesAutocomplete
            ref={(instance) => { this.GooglePlacesRef = instance }}
            placeholder="Search..."
            returnKeyType={'search'}
            fetchDetails={true}
            onPress={(data, details) => {
              this.getAlamatLengkap(data, details)
                , this.GooglePlacesRef.setAddressText("")
            }}
            onFail={error => console.error(error)}
            query={{
              key: 'AIzaSyCBQDPAUpc5cVsaVj54AraevEluOmbyxcc',
              language: 'id',
              components: 'country:id',
            }}
            styles={{
              textInputContainer: {
                borderRadius: 10,
              },
              textInput: {
                marginHorizontal: 10,
                height: 50,
                color: '#5d5d5d',
                fontSize: 13,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <MapView
            style={styles.map}
            region={location}
            provider={PROVIDER_GOOGLE}
            scrollEnabled={true}
            showsUserLocation={true}
            showsMyLocationButton={false}
            zoomControlEnabled
          >
            <Marker
              draggable={true}
              coordinate={location}
            >
              <Callout>
                <View>
                  <Text style={{}}>{address}</Text>
                </View>
              </Callout>
            </Marker>
          </MapView>
        </View>

        <View style={{ flex: 1, top: 10, marginHorizontal: 10 }}>
          <TextInput
            value={name, address}
            style={{
              height: 60,
              width: 300,
              borderWidth: 1,
              borderRadius: 10,
              alignSelf: 'center'
            }}
            numberOfLines={2}
            editable={true}
            multiline={true}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    marginBottom: 0
  },
});

export default (AutoComplete)