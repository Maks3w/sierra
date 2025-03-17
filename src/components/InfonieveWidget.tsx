interface InfonieveWidgetProps {
  estacion: number;
}

const InfonieveWidget = ({estacion}: InfonieveWidgetProps) => {
  const iframeSrc = `https://www.infonieve.es/widgets/estado-estacion.php?width=299&estacion=${estacion}&bgcolor=D2D2D2&txtcolor=000000&target=top`;

  return (
    <iframe
      src={iframeSrc}
      width="300"
      height="220"
      style={{border: 'none'}}
      title="Infonieve Widget"
    ></iframe>
  );
};

export default InfonieveWidget;