# Map

## Mapbox API call

Here is the Mapbox static images API call I made to produce ../src/img/map1.png:

```sh
curl -g "https://api.mapbox.com/styles/v1/bzelip/clsuqcqz2004201qg0bwacy2a/static/auto/600x500@2x?access_token=pk.eyJ1IjoiYnplbGlwIiwiYSI6ImIwMTZjMmY1YzViODIyZmRkYmZiZWYxZmU3NWM1MzQwIn0.yz0R9vap9zNUMy73Q0lV2w" --output map1.png
```

### References

- https://docs.mapbox.com/api/maps/static-images/#example-requests
- Static image API playground, https://docs.mapbox.com/playground/static/
- Public Mapbox style published from my bzelip account, https://studio.mapbox.com/styles/bzelip/clsuqcqz2004201qg0bwacy2a/edit/#14.09/39.22651/-76.70681
