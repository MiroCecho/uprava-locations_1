import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat, toLonLat, get } from "ol/proj";
import "./style/ol.css";
import "./style/custom.css";
import { defaults as defautInteractions } from "ol/interaction";
import { Overlay } from "ol";
import { Pixel } from "ol/pixel";
import * as data from "../repository/all_Locations.json";
import { generatePopupContent } from './generate-popup-content';

const container:HTMLElement = document.getElementById("popup");
const content:HTMLElement = document.getElementById("popup-content");
const closer:HTMLElement = document.getElementById("popup-closer");

const overlay:Overlay = new Overlay({
    element: container,
    autoPan: {
        animation: {
            duration: 250,
        },
    },
});
// tslint:disable-next-line: typedef
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
map.on("singleclick", evt=> {
    const coordinate:Pixel = evt.coordinate;
    const detail = generatePopupContent(data);
    content.innerHTML = `<div id="popup-content" style="width: 200px;"></div>`;
    content.querySelector('div').appendChild(detail);
    overlay.setPosition(coordinate);
});
