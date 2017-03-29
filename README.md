# flashdash

Deployed: http://www.flashdash.info/

Flashdash allows users to take data from any web API and create stunning visualizations.The app automatically identifies the correct data from the API response and presents the user with plottable keys and their data types. Upon selection of keys, the app automatically and dynamically renders the possible graphs that can be created with that particular selection of keys.

After a graph is selected, it is placed on a widget on the dashboard layout. On the dashboard, widgets can be dynamically resized and relocated. Their locations and sizes are persisted to our database. Users can have multiple dashboards and those dashboards can be viewed on different screens or switched as desired.

Our app supports realtime data. A refresh interval can be set for a particular api route. Data is then updated every interval and the graph is updated to reflect the new data.
