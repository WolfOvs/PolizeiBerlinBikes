import { useState } from "react";
import { Bike } from "../../types/bike";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import L from "leaflet";
import { formatDate } from "@utils/format";

interface TableProps {
  dataBikes: Bike[];
}

const GetIcon = (coord: [number, number], selectedBike: [number, number]) => {
  const pinIcon =
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png";
  const wheelIcon = "/assets/layout/images/wheel.png";

  if (coord) {
    return L.icon({
      iconUrl: coord === selectedBike ? wheelIcon : pinIcon,
      iconSize: coord === selectedBike ? [40, 40] : [35, 35],
    });
  }
};

const TableMap = (data: TableProps) => {
  const [selectedBike, setSelectedBike] = useState<[number, number]>();
  const bikePlaceholder = "/assets/layout/images/bike.png";
  const selectMarker = (bike: [number, number]) => {
    setSelectedBike(bike);
  };

  return (
    <div className="flex">
      <div className="map-container mr-2">
        <MapContainer
          style={{ height: 500 }}
          center={selectedBike!?.length > 0 ? selectedBike : [52.52, 13.405]}
          zoom={selectedBike!?.length > 0 ? 18 : 10}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data?.dataBikes.map((bike: Bike, index: number) => (
            <Marker
              icon={GetIcon(bike.stolen_coordinates, selectedBike ?? [0, 0])}
              key={index}
              eventHandlers={{
                click: (e) => {
                  selectMarker(bike.stolen_coordinates);
                },
              }}
              position={[
                bike.stolen_coordinates[0],
                bike.stolen_coordinates[1],
              ]}
            >
              <Popup>{bike.title}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date stolen</th>
              <th>Serial number</th>
            </tr>
          </thead>
          <tbody>
            {data.dataBikes?.map((bike: Bike, index: number) => (
              <tr
                key={index}
                onClick={() => selectMarker(bike.stolen_coordinates)}
                className={
                  selectedBike === bike.stolen_coordinates ? "selected" : ""
                }
              >
                <td className="img-cell">
                  <img src={bike.thumb ? bike.thumb : bikePlaceholder} />
                </td>
                <td className="title-column">{bike.title}</td>
                <td>{bike.frame_colors}</td>
                <td>{formatDate(bike.date_stolen)}</td>
                <td>{bike.serial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableMap;
