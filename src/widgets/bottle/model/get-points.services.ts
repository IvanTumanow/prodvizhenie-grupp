import { Vector2 } from "./properties.types";

interface IGetPoints {
    container: HTMLElement;
}

export function getPoints({ container }: IGetPoints): HTMLElement[] {
    return Array.from(container.querySelectorAll('span[data-id-value]'));
}






interface IGetPointsCoords extends IGetPoints {
    bottle: HTMLImageElement
}

type OutputPointsCoords = (point: HTMLElement) => Vector2

export function getPointsCoords({ container, bottle }: IGetPointsCoords): OutputPointsCoords {
    const containerRect = container.getBoundingClientRect();
    return (point: HTMLElement) => {
        const pointRect = point.getBoundingClientRect();

        return {
            x: pointRect.left - containerRect.left
                + point.offsetWidth / 2 - bottle.offsetWidth / 2,
            y: pointRect.top - containerRect.top
                + point.offsetHeight / 2 - bottle.offsetHeight / 2,
        };
    }
};