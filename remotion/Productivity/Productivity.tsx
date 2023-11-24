import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const PRODUCTIVITY_SEQUENCE_DURATION = 120;
const barBackground = "rgb(0,0,0)";
const barColor = "rgb(133,134,214)";

type ProductivityPerHour = {
  time: number;
  productivity: number;
};

type Props = {
  graphData: Array<ProductivityPerHour>;
};

const Bar = (props: { productivity: number }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const height = spring({
    fps,
    frame,
    from: 0,
    to: 100,
    config: {
      mass: props.productivity * 10,
      damping: 200,
    },
  });

  return (
    <div
      style={{
        width: 24,
        height: `${height}%`,
        background: barBackground,
        display: "flex",
        alignItems: "flex-end",
        borderRadius: 16,
      }}
    >
      <div
        style={{
          background: barColor,
          width: "100%",
          height: `${props.productivity * 100}%`,
          borderRadius: 16,
        }}
      />
    </div>
  );
};

const Graph = (props: { productivityPerHour: Array<ProductivityPerHour> }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 16,
        height: 480,
      }}
    >
      {props.productivityPerHour.map((productivityPerHour) => {
        return (
          <div
            key={productivityPerHour.time}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Bar productivity={productivityPerHour.productivity} />
            <div
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: 700,
                fontFamily: "Mona Sans",
              }}
            >
              {productivityPerHour.time}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Productivity: React.FC<Props> = ({ graphData }) => {
  return (
    <AbsoluteFill
      style={{
        background: "rgb(21,20,39)",
        display: "flex",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: 120,
          fontFamily: "Mona Sans",
          fontWeight: 800,
          paddingTop: 80,
          textAlign: "center",
        }}
      >
        Monday 3PM
      </div>
      <div
        style={{
          color: "white",
          fontSize: 40,
          fontFamily: "Mona Sans",
          fontWeight: 300,
          textAlign: "center",
        }}
      >
        Is your most productive time
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Graph productivityPerHour={graphData} />
      </div>
    </AbsoluteFill>
  );
};
