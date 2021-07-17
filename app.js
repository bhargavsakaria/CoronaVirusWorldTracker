window.addEventListener('DOMContentLoaded', initializeApp);

// the base URL endpoint
const baseUrlEndPoint = `https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=false`;

// Container for displaying the corona details
let coronaDetailsContainer;

// Dropdown for country selection
let countrySelectDropdown;

// Container for redering world corona details
let coronaWorldDetailsContainer;

const coronaData = {
	latest: {},
	locations: []
}

const countriesWithCountryCodes = { 
	AF:'Afghanistan',
	AX:'Åland Islands',
	AL:'Albania',
	DZ:'Algeria',
	AS:'American Samoa',
	AD:'AndorrA',
	AO:'Angola',
	AI:'Anguilla',
	AQ:'Antarctica',
	AG:'Antigua and Barbuda',
	AR:'Argentina',
	AM:'Armenia',
	AW:'Aruba',
	AU:'Australia',
	AT:'Austria',
	AZ:'Azerbaijan',
	BS:'Bahamas',
	BH:'Bahrain',
	BD:'Bangladesh',
	BB:'Barbados',
	BY:'Belarus',
	BE:'Belgium',
	BZ:'Belize',
	BJ:'Benin',
	BM:'Bermuda',
	BT:'Bhutan',
	BO:'Bolivia',
	BA:'Bosnia and Herzegovina',
	BW:'Botswana',
	BV:'Bouvet Island',
	BR:'Brazil',
	IO:'British Indian Ocean Territory',
	BN:'Brunei Darussalam',
	BG:'Bulgaria',
	BF:'Burkina Faso',
	BI:'Burundi',
	KH:'Cambodia',
	CM:'Cameroon',
	CA:'Canada',
	CV:'Cape Verde',
	KY:'Cayman Islands',
	CF:'Central African Republic',
	TD:'Chad',
	CL:'Chile',
	CN:'China',
	CX:'Christmas Island',
	CC:'Cocos (Keeling) Islands',
	CO:'Colombia',
	KM:'Comoros',
	CG:'Congo',
	CD:'Congo, The Democratic Republic of the',
	CK:'Cook Islands',
	CR:'Costa Rica',
	CI:'Cote D\'Ivoire',
	HR:'Croatia',
	CU:'Cuba',
	CY:'Cyprus',
	CZ:'Czech Republic',
	DK:'Denmark',
	DJ:'Djibouti',
	DM:'Dominica',
	DO:'Dominican Republic',
	EC:'Ecuador',
	EG:'Egypt',
	SV:'El Salvador',
	GQ:'Equatorial Guinea',
	ER:'Eritrea',
	EE:'Estonia',
	ET:'Ethiopia',
	FK:'Falkland Islands (Malvinas)',
	FO:'Faroe Islands',
	FJ:'Fiji',
	FI:'Finland',
	FR:'France',
	GF:'French Guiana',
	PF:'French Polynesia',
	TF:'French Southern Territories',
	GA:'Gabon',
	GM:'Gambia',
	GE:'Georgia',
	DE:'Germany',
	GH:'Ghana',
	GI:'Gibraltar',
	GR:'Greece',
	GL:'Greenland',
	GD:'Grenada',
	GP:'Guadeloupe',
	GU:'Guam',
	GT:'Guatemala',
	GG:'Guernsey',
	GN:'Guinea',
	GW:'Guinea-Bissau',
	GY:'Guyana',
	HT:'Haiti',
	HM:'Heard Island and Mcdonald Islands',
	VA:'Holy See (Vatican City State)',
	HN:'Honduras',
	HK:'Hong Kong',
	HU:'Hungary',
	IS:'Iceland',
	IN:'India',
	ID:'Indonesia',
	IR:'Iran, Islamic Republic Of',
	IQ:'Iraq',
	IE:'Ireland',
	IM:'Isle of Man',
	IL:'Israel',
	IT:'Italy',
	JM:'Jamaica',
	JP:'Japan',
	JE:'Jersey',
	JO:'Jordan',
	KZ:'Kazakhstan',
	KE:'Kenya',
	KI:'Kiribati',
	KP:'Korea, Democratic People\'S Republic of',
	KR:'Korea, Republic of',
	KW:'Kuwait',
	KG:'Kyrgyzstan',
	LA:'Lao People\'S Democratic Republic',
	LV:'Latvia',
	LB:'Lebanon',
	LS:'Lesotho',
	LR:'Liberia',
	LY:'Libyan Arab Jamahiriya',
	LI:'Liechtenstein',
	LT:'Lithuania',
	LU:'Luxembourg',
	MO:'Macao',
	MK:'Macedonia, The Former Yugoslav Republic of',
	MG:'Madagascar',
	MW:'Malawi',
	MY:'Malaysia',
	MV:'Maldives',
	ML:'Mali',
	MT:'Malta',
	MH:'Marshall Islands',
	MQ:'Martinique',
	MR:'Mauritania',
	MU:'Mauritius',
	YT:'Mayotte',
	MX:'Mexico',
	FM:'Micronesia, Federated States of',
	MD:'Moldova, Republic of',
	MC:'Monaco',
	MN:'Mongolia',
	MS:'Montserrat',
	MA:'Morocco',
	MZ:'Mozambique',
	MM:'Myanmar',
	NA:'Namibia',
	NR:'Nauru',
	NP:'Nepal',
	NL:'Netherlands',
	AN:'Netherlands Antilles',
	NC:'New Caledonia',
	NZ:'New Zealand',
	NI:'Nicaragua',
	NE:'Niger',
	NG:'Nigeria',
	NU:'Niue',
	NF:'Norfolk Island',
	MP:'Northern Mariana Islands',
	NO:'Norway',
	OM:'Oman',
	PK:'Pakistan',
	PW:'Palau',
	PS:'Palestinian Territory, Occupied',
	PA:'Panama',
	PG:'Papua New Guinea',
	PY:'Paraguay',
	PE:'Peru',
	PH:'Philippines',
	PN:'Pitcairn',
	PL:'Poland',
	PT:'Portugal',
	PR:'Puerto Rico',
	QA:'Qatar',
	RE:'Reunion',
	RO:'Romania',
	RU:'Russian Federation',
	RW:'RWANDA',
	SH:'Saint Helena',
	KN:'Saint Kitts and Nevis',
	LC:'Saint Lucia',
	PM:'Saint Pierre and Miquelon',
	VC:'Saint Vincent and the Grenadines',
	WS:'Samoa',
	SM:'San Marino',
	ST:'Sao Tome and Principe',
	SA:'Saudi Arabia',
	SN:'Senegal',
	CS:'Serbia and Montenegro',
	SC:'Seychelles',
	SL:'Sierra Leone',
	SG:'Singapore',
	SK:'Slovakia',
	SI:'Slovenia',
	SB:'Solomon Islands',
	SO:'Somalia',
	ZA:'South Africa',
	GS:'South Georgia and the South Sandwich Islands',
	ES:'Spain',
	LK:'Sri Lanka',
	SD:'Sudan',
	SR:'Suriname',
	SJ:'Svalbard and Jan Mayen',
	SZ:'Swaziland',
	SE:'Sweden',
	CH:'Switzerland',
	SY:'Syrian Arab Republic',
	TW:'Taiwan, Province of China',
	TJ:'Tajikistan',
	TZ:'Tanzania, United Republic of',
	TH:'Thailand',
	TL:'Timor-Leste',
	TG:'Togo',
	TK:'Tokelau',
	TO:'Tonga',
	TT:'Trinidad and Tobago',
	TN:'Tunisia',
	TR:'Turkey',
	TM:'Turkmenistan',
	TC:'Turks and Caicos Islands',
	TV:'Tuvalu',
	UG:'Uganda',
	UA:'Ukraine',
	AE:'United Arab Emirates',
	GB:'United Kingdom',
	US:'United States',
	UM:'United States Minor Outlying Islands',
	UY:'Uruguay',
	UZ:'Uzbekistan',
	VU:'Vanuatu',
	VE:'Venezuela',
	VN:'Viet Nam',
	VG:'Virgin Islands, British',
	VI:'Virgin Islands, U.S.',
	WF:'Wallis and Futuna',
	EH:'Western Sahara',
	YE:'Yemen',
	ZM:'Zambia',
	ZW:'Zimbabwe'
}

function populateLocation(country, country_code) {
	const countryOption = document.createElement('option');
	countryOption.value = country;
	countryOption.textContent = `${country_code}-${country}`;
	countrySelectDropdown.appendChild(countryOption);
}

function populateLocations() {
	Object.entries(countriesWithCountryCodes).forEach(([country_code, country]) => populateLocation(country, country_code));
}

let geocoder;
async function geocodeReverseFromLatLongToPlace(lat, lng) {
	return new Promise((resolve, reject) => {
		geocoder.mapboxClient.geocodeReverse({
			latitude: parseFloat(lat),
			longitude: parseFloat(lng)
		}, function (error, response) {
			if(error) {
				reject(error);
			}
			resolve(response.features[0] && response.features[0].place_name);
		});
	});
}

function renderMap() {
	mapboxgl.accessToken =
		"pk.eyJ1IjoiYmhhcmdhdnNha2FyaWEiLCJhIjoiY2tyODFzOW0xM3VybzJwbzh0cDBtajZ0byJ9.0slSRt0ysVHz0ua1mjS2mg";
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/dark-v10',
		center: [-103.59179687498357, 40.66995747013945],
		zoom: 3
	});

	geocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl,
	});
	map.on('load', async function () {
		map.addControl(geocoder);

		// Zoom and rotational controls
		map.addControl(new mapboxgl.NavigationControl());

		// Add a new source from our GeoJSON data and
		// set the 'cluster' option to true. GL-JS will
		// add the point_count property to your source data.
		map.addSource("places", {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				crs: {
					type: "name",
					properties: {
						name: "urn:ogc:def:crs:OGC:1.3:CRS84",
					},
				},
				features: await Promise.all(coronaData.locations.map(async(location) => {
					// Do reverse geocoding
					const placename = await geocodeReverseFromLatLongToPlace(location.coordinates.latitude, location.coordinates.longitude);
					return {
						type: "Feature",
						properties: {
							description: `
							<table>
								<thead>
									<tr>${placename}</tr>		
								</thead>
								<tbody>
									<tr>
										<td>Confirmed Cases</td>
										<td>${location.latest.confirmed}</td>
									</tr>
									<tr>
										<td>Deaths</td>
										<td>${location.latest.deaths}</td>
									</tr>
									<tr>
										<td>Latitude</td>
										<td>${location.coordinates.latitude}</td>
									</tr>
									<tr>
										<td>Longitude</td>
										<td>${location.coordinates.longitude}</td>
									</tr>
								</tbody>
							</table>`,
							icon: "rokect",
						},
						geometry: {
							type: "Point",
							coordinates: [
								`${location.coordinates.longitude}`,
								`${location.coordinates.latitude}`,
							],
						},
					};
				})),
			},
			cluster: true,
			clusterMaxZoom: 14, // Max zoom to cluster points on
			clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
		});

		map.addLayer({
			id: "clusters",
			type: "circle",
			source: "places",
			filter: ["has", "point_count"],
			paint: {
				// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
				// with three steps to implement three types of circles:
				//   * Blue, 20px circles when point count is less than 100
				//   * Yellow, 30px circles when point count is between 100 and 750
				//   * Pink, 40px circles when point count is greater than or equal to 750
				"circle-color": [
					"step",
					["get", "point_count"],
					"#51bbd6",
					100,
					"#f1f075",
					750,
					"#f28cb1",
				],
				"circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
			},
		});

		map.addLayer({
			id: "cluster-count",
			type: "symbol",
			source: "places",
			filter: ["has", "point_count"],
			layout: {
				"text-field": "{point_count_abbreviated}",
				"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
				"text-size": 12,
			},
		});

		map.addLayer({
			id: "unclustered-point",
			type: "circle",
			source: "places",
			filter: ["!", ["has", "point_count"]],
			paint: {
				"circle-color": "#11b4da",
				"circle-radius": 4,
				"circle-stroke-width": 1,
				"circle-stroke-color": "#fff",
			},
		});

		// inspect a cluster on click
		map.on("click", "clusters", function (event) {
			const features = map.queryRenderedFeatures(event.point, {
				layers: ["clusters"],
			});
			const clusterId = features[0].properties.cluster_id;
			map
				.getSource("places")
				.getClusterExpansionZoom(clusterId, function (error, zoom) {
					if (error) return;

					map.easeTo({
						center: features[0].geometry.coordinates,
						zoom: zoom,
					});
				});
		});

		// When a click event occurs on a feature in
		// the unclustered-point layer, open a popup at
		// the location of the feature, with
		// description HTML from its properties.
		map.on("click", "unclustered-point", function (event) {
			const coordinates = event.features[0].geometry.coordinates.slice();
			const { description } = event.features[0].properties;

			// Ensure that if the map is zoomed out such that
			// multiple copies of the feature are visible, the
			// popup appears over the copy being pointed to.
			while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
			}

			new mapboxgl.Popup()
				.setLngLat(coordinates)
				.setHTML(description)
				.addTo(map);
		});

		map.on("mouseenter", "clusters", function () {
			map.getCanvas().style.cursor = "pointer";
		});
		map.on("mouseleave", "clusters", function () {
			map.getCanvas().style.cursor = "";
		});
	});
}

async function initializeApp() {
	// console.log("started");
	setReferences();
	doEventBindings();
	NProgress.start();
	populateLocations();
	await performAsyncCall();
	rednerUI(coronaData.latest, true);
	// console.log('Corona Data World Details', coronaData.latest);
	// console.log(`Corona Prone Locations: ${coronaData.locations}`);
	renderMap();
	NProgress.done();
}

function setReferences() {
	coronaDetailsContainer      = document.querySelector("#corona-details");
	countrySelectDropdown       = document.querySelector('[name="select-country"]');
	coronaWorldDetailsContainer = document.querySelector('#corona-world-details');
}

async function performAsyncCall() {
	const reponse = await fetch(`${baseUrlEndPoint}`);
	const data = await reponse.json();

	const {latest, locations} = data;
	coronaData.latest = latest;
	coronaData.locations.push(...locations);
}

function rednerUI(details, world=false) {
	let html = '';
	html = `
	<table class="table">
		<thead>
			${
				world
					? "<h1>World Details</h1>"
					: `<tr>${details.country} ${details.country_code}</tr>`
			}
		</thead>
		<tbody>
			<tr>
				<td class="cases">Reportd Cases</td>
				<td>${world ? details.confirmed : details.latest.confirmed}</td>
			</tr>
			<tr>
				<td class="deaths">Deaths</td>
				<td>${world ? details.deaths : details.latest.deaths}</td>
			</tr>
		</tbody>
	</table>`;
	if(world) {
		coronaWorldDetailsContainer.innerHTML = html;
	} else {
		coronaDetailsContainer.innerHTML = html;
	}
}

function redenrDetailsForSelectedLocation(event) {
	const countrySelected = event.target.value;

	const locationCoronaDetails = coronaData.locations.reduce((accumulator, currentLocation) => {
			if(currentLocation.country === countrySelected) {
				accumulator.country      = currentLocation.country;
				accumulator.country_code = currentLocation.country_code;

				accumulator.latest.confirmed += currentLocation.latest.confirmed;
				accumulator.latest.deaths    += currentLocation.latest.deaths;
			}
			return accumulator;
		}, {
			country: '',
			country_code: '',
			latest: {
				confirmed: 0,
				deaths: 0
			}
		}
	);
	rednerUI(locationCoronaDetails);
}

function doEventBindings() {
	countrySelectDropdown.addEventListener('change', redenrDetailsForSelectedLocation);
}