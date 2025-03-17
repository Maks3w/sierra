import styles from './DgtPmv.module.css';

class Panel {
  leftImage = "apagado.gif";
  rightImage = "apagado.gif";
  message = "";

  constructor(leftImage: string, rightImage: string, message: string) {
    this.leftImage = (leftImage.length !== 0) ? leftImage : "apagado.gif";
    this.rightImage = (rightImage.length !== 0) ? rightImage : "apagado.gif"
    this.message = message;
  }
}

interface PanelData {
  mensaje2: string;
  mensaje1: string;
  imgTxtIzq1: string;
  imgTxtIzq2: string;
  textoAdvertenciaPrecision: string;
  indiceMapa: string;
  drawDer2: string;
  drawIz2: string;
  tipo: string;
  drawDer1: string;
  drawIz1: string;
  imgTxtDer2: string;
  imgTxtDer1: string;
  NumAlternancias: string;
}

async function retrievePanelData(panelId: string): Promise<PanelData> {
  const response = await fetch(`https://infocar.dgt.es/etraffic/BuscarElementos?accion=getDetalles&codEle=${panelId}&tipo=Panel_CMS&indiceMapa=0`);
  return await response.json();
}

async function connectedCallback(panelId: string) {
  const request = await retrievePanelData(panelId);

  const panel1 = new Panel(request.drawIz1, request.drawDer1, request.mensaje1);
  const panel2 = new Panel(request.drawIz2, request.drawDer2, request.mensaje2);

  return {numAlternancias: request.NumAlternancias, panel1, panel2};
}

function renderSubPanel(subPanelId: number, panel: Panel) {
  const pathIcoPanel = 'https://infocar.dgt.es/etraffic/img/ICONOenPANELES/';
  return (
    <div className={styles.fondo_cms} id={`panel_${subPanelId}`}>
      <img src={`${pathIcoPanel}${panel.leftImage}`} width="42px" height="42px" alt="señal izquierda"/>
      <div className={styles.cmsText} dangerouslySetInnerHTML={{ __html: panel.message }}></div>
      <img src={`${pathIcoPanel}${panel.rightImage}`} width="42px" height="42px" alt="señal derecha"/>
    </div>
);
}

interface DgtPmvProps {
  panelId: string;
}

export default async function DgtPmv({panelId}: DgtPmvProps) {
  const data = await connectedCallback(panelId);
  return (
    <div className={styles.panel}>
      {renderSubPanel(1, data.panel1)}
      {data.numAlternancias === '2' && renderSubPanel(2, data.panel2)}
    </div>
  );
};
