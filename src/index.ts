import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat, toLonLat, get } from "ol/proj";
import "./style/ol.css";
import "./style/custom.css";
import { defaults as defautInteractions } from "ol/interaction";
import "./style/ol.css";
import "./style/custom.css";
import { Overlay } from "ol";

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const overlay = new Overlay({
    element: container,
    autoPan: {
        animation: {
            duration: 250,
        },
    },
});
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};
export const map: Map = new Map({
    target: "map",
    interactions: defautInteractions({ doubleClickZoom: false }),
    overlays: [overlay],
    layers: [
        new TileLayer({
            source: new XYZ({
                url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            })
        })
    ],
    view: new View({
        center: fromLonLat([19.6, 48.7]),
        zoom: 8.3,
        projection: get("EPSG:3857"),
    })
});
map.on('singleclick', function (evt) {
    const coordinate = evt.coordinate;
    content.innerHTML = `<div id="popup-content" style="width: 200px;"><div id="eam-info-list"><ul><li title="23" idx="0">23</li><li title="Funkčné miesto 66" idx="1">Funkčné miesto 66</li><li title="A_Funkčné miesto" idx="2">A_Funkčné miesto</li></ul></div></div>`;
    overlay.setPosition(coordinate);
});
