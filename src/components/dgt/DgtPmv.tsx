import styles from './DgtPmv.module.css';
import Image from "next/image";
import {getDetalles} from "@/components/dgt/infocarApi";
import {Panel_CMS} from "@/components/dgt/types/BuscarElementos";

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

async function connectedCallback(panelId: string) {
  const response = await getDetalles(panelId, "Panel_CMS") as Panel_CMS;

  const panel1 = new Panel(response.drawIz1, response.drawDer1, response.mensaje1);
  const panel2 = new Panel(response.drawIz2, response.drawDer2, response.mensaje2);

  return {numAlternancias: response.NumAlternancias, panel1, panel2};
}

function renderSubPanel(subPanelId: number, panel: Panel) {
  const pathIcoPanel = 'https://infocar.dgt.es/etraffic/img/ICONOenPANELES/';
  return (
    <div className={styles.fondo_cms} id={`panel_${subPanelId}`}>
      <Image src={`${pathIcoPanel}${panel.leftImage}`} width={42} height={42} alt="señal izquierda"/>
      <div className={styles.cmsText} dangerouslySetInnerHTML={{ __html: panel.message }}></div>
      <Image src={`${pathIcoPanel}${panel.rightImage}`} width={42} height={42} alt="señal derecha"/>
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
