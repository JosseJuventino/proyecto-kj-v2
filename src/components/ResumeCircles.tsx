import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ResumeCircleProps{
    hours: number;
    text: string;
}

export const ResumeCircles: React.FC<ResumeCircleProps> = ({ hours, text }) => {
    return (
      <>
      <div className="justify-center mx-10 gap-2">
        <div className="flex w-28 mt-5 md:mt-0 flex-col">
          <div className="justify-center text-xl">
            <CircularProgressbar
              value={hours}
              minValue={0}
              maxValue={300}
              text={hours ? `${hours}h` : "0h"}
              styles={{
                path: {
                  stroke: `rgba(0, 0, 0)`,
                },
                text: {
                  fill: "#000",
                },
              }}
            />
          </div>
          <p>{text}</p>
        </div>
      </div>
    </>  
    );
}