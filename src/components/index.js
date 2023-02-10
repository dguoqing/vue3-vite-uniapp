import CustomStatusBar from './custom-status-bar'

const components = [CustomStatusBar];

export const install = app => {
    components.forEach(component => {
        console.log(component)
        app.component(component.name, component)
    })
}

export default install

export {
    CustomStatusBar 
}