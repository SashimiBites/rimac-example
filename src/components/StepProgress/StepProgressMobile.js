const StepProgressMobile = ({steps, currentStep}) => {
  if(currentStep > steps.length) throw new Error('current step cant be bigger than steps');

  return (
      <div className="progress-line">
          <p className="progress-line__text">Paso {steps.length} de {currentStep}</p>
          <div className="progress-line__back">
              <div 
              className="progress-line__progress"
              style={{width : (100 * currentStep / steps.length) + '%'}}
              ></div>
          </div>
      </div>
  );
}

export default StepProgressMobile;