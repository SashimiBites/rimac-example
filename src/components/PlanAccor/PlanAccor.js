const PlanAccor = (props) => {
  return (
      <div className="plan-accor">
          <img
              className="plan-accor__img-desc"
              src={process.env.REACT_APP_IMAGE_CDN + props.img}
              alt="Imagen de descripción"
          />
          <div className="plan-accor__label">
              <input
                  className="plan-accor__hidden-check"
                  id={"plan-" + props.compKey}
                  name={"plan-" + props.compKey}
                  type="checkbox"
                  />
              <img
                  className="plan-accor__img-chev"
                  src={process.env.REACT_APP_IMAGE_CDN + "icon-chevrot-red.png"}
                  alt="Icono down"
                  />
              <label htmlFor={"plan-" + props.compKey} className="plan-accor__title">
                  {props.title}
              </label>
              <div
                  className="plan-accor__btn-add"
                  onClick={() => props.clickPlanHandle(props.id)}
                  >
                  <div className="btn">{props.added === false ? "+" : "-"}</div>
                  <p className="text">{props.added === false ? "AGREGAR" : "QUITAR"}</p>
              </div>
              <div className="plan-accor__content">{props.description}</div>
          </div>
      </div>
  );
};

export default PlanAccor;
