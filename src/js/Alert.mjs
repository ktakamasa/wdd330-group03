async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw { name: "alertError", message: data}
    }
  }

export default class Alert {
    constructor() {
        this.alerts = [];
        this.path = `../json/alerts.json`;
    }
    async init() {
        this.alerts = await this.getAlerts();
        this.displayAlerts();
    }
    async getAlerts() {
        const response = await fetch(this.path);
        const data = await convertToJson(response);
        return data;
    }
    displayAlerts() {
        const alertList = document.createElement('section');
        alertList.classList.add('alert-list');
        for (const alert of this.alerts) {
            const alertP = document.createElement('p');
            alertP.textContent = alert.message;
            alertP.style.backgroundColor = alert.background;
            alertP.style.color = alert.color;
            alertList.appendChild(alertP);
        }
        const mainElement = document.querySelector('main');
        mainElement.prepend(alertList);
    }
}