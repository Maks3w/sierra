interface InfonieveWidgetProps {
  estacion: number;
}

const InfonieveWidget = ({estacion}: InfonieveWidgetProps) => {
  const iframeSrc = `/infoNieveProxy?estacion=${estacion}`;

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