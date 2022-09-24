 <div className="z-50 relaive">
        <div className="fixed z-[9999] inset-0">
          <UserGuideComponent />
        </div>
      </div> 




import { ButtonTypeEnum } from "@/enums";
import { ButtonSizeEnum } from "@/enums/button-size.enum";
import { useEffect, useReducer, useState } from "react";
import Joyride, {
  CallBackProps,
  STATUS,
  Step,
  ACTIONS,
  EVENTS,
} from "react-joyride";
import ButtonComponent from "./form/button";

type Props = {};

const UserGuideComponent: React.FC<Props> = ({}) => {
  const TOUR_STEPS = [
    {
      content: <h2>Lets begin our journey!</h2>,
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      placement: "center",
      target: "body",
      disableBeacon: true,
    },
    {
      content: "Application first step",
      floaterProps: {
        disableAnimation: true,
      },
      spotlightPadding: 20,
      target: ".demo__stepone h2",
      title: "Apply to Application",
    },
    {
      content: <h2>Application second step</h2>,
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: ".demo__steptwo h2",
      title: "Select course Intake",
    },
    {
      content: (
        <div>
          You apply couse then go to Application Card page!
          <br />
          <h3>Card Click to steps completed</h3>
        </div>
      ),
      placement: "top",
      target: ".demo__stepthree h2",
      title: "Go to Application Card Page",
    },
    {
      content: (
        <div>
          <h3>All steps complete Application</h3>
          <svg
            height="50px"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 96 96"
            width="50px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
                fill="#000000"
              />
            </g>
          </svg>
        </div>
      ),
      placement: "left",
      target: ".demo__stepfour h2",
    },
  ];

  const INITIAL_STATE = {
    key: new Date(),
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: TOUR_STEPS,
  };

  // Set up the reducer function
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "START":
        return { ...state, run: true };
      case "RESET":
        return { ...state, stepIndex: 0 };
      case "STOP":
        return { ...state, run: false };
      case "NEXT_OR_PREV":
        return { ...state, ...action.payload };
      case "RESTART":
        return {
          ...state,
          stepIndex: 0,
          run: true,
          loading: false,
          key: new Date(),
        };
      default:
        return state;
    }
  };

  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffect(() => {
    if (!localStorage.getItem("tour")) {
      dispatch({ type: "START" });
    }
  }, []);

  const callback = (data) => {
    const { action, index, type, status } = data;
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };

  const startTour = () => {
    dispatch({ type: "RESTART" });
  };

  return (
    <>
      <Joyride
        {...tourState}
        callback={callback}
        continuous
        hideCloseButton
        scrollToFirstStep
        showProgress
        showSkipButton
        styles={{
          options: {
            zIndex: 9999,
          },
          tooltipContainer: {
            textAlign: "left",
          },
          buttonBack: {
            marginRight: 10,
          },
        }}
        locale={{
          last: "End Aplication Steps",
        }}
      />
      <section className="flex flex-col items-center justify-center w-full h-full bg-gray-200 gap-y-60 py-52">
        <div className="max-w-lg px-10 py-20 bg-white">
          <div className="text-xl font-semibold text-gray-600">
            Create guided tours for your application
          </div>

          <ButtonComponent
            type={ButtonTypeEnum.Primary}
            size={ButtonSizeEnum.md}
            text="Start"
            onClick={() => startTour}
          />
        </div>

        <div className="absolute max-w-lg px-10 py-10 bg-white demo__stepone top-6 right-6">
          <div className="text-xl font-semibold text-gray-600">
            <h2>Apply to Application</h2>
          </div>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
          </p>
        </div>

        <div className="absolute max-w-lg px-10 py-20 bg-white demo__steptwo bottom-6 right-6">
          <div className="text-xl font-semibold text-gray-600">
            <h2>Select course Intake</h2>
          </div>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
            earum illo beatae nostrum, fugit ea, Rem.
          </p>
        </div>

        <div className="absolute max-w-lg px-10 py-20 bg-white demo__stepthree top-6 left-6">
          <div className="text-xl font-semibold text-gray-600">
            <h2>Go to Application Card Page</h2>
          </div>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. dolorum
            tenetur voluptate nulla saepe! Rem.
          </p>
        </div>

        <div className="absolute max-w-lg px-10 py-20 bg-white demo__stepfour bottom-8 left-8">
          <h2>Our Applications Details here</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
            dolorum tenetur voluptate nulla saepe! Rem.
          </p>
        </div>
      </section>
    </>
  );
};

export default UserGuideComponent;
