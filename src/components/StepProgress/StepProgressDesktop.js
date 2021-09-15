const StepProgressDesktop = ({steps, currentStep}) => {
  if(currentStep > steps.length) throw new Error('current step cant be bigger than steps');

  return (
      <div className="progress-cont">
          <ul className="progress">
              {/* <li className="progress__item">
                  Datos del auto
              </li>
              <li className="progress__item complete">
                  Arma tu plan
              </li> */}
              {
                  steps.map((el, key) => {
                      return (
                          <li 
                              key={'steps_' + key} 
                              className={'progress__item ' + (key + 1 === currentStep ? 'complete' : '')}>
                              {el}
                          </li>
                      )
                  })
              }
          </ul>
      </div>
  );
}

export default StepProgressDesktop;