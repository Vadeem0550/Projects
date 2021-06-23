import {
  Component,
  ViewChild,
  ElementRef, AfterViewInit,
} from '@angular/core';
import * as d3 from 'd3';


export interface IChartData {
  unit: string;
  name: string;
  fact: number;
  plan: number;
}

@Component({
  selector: 'app-circle-svg',
  templateUrl: './circle-svg.component.html',
  styleUrls: ['./circle-svg.component.scss'],
})
export class CircleSvgComponent implements AfterViewInit {

  data: IChartData = {
    unit: 'ТН',
    name: 'План переработки',
    fact: 70,
    plan: 100,
  };

  public unit: string;
  public name: string;
  public fact: number;
  public plan: number;

  private svgElement;
  private groupElement;

  private width = 335;
  public startDeg = 0;
  public endDeg = 260;
  public currentProgress: number;

  @ViewChild('chartRef') chartRef: ElementRef;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.setData();
    this.deleteChart();
    this.newChart();
  }

  setData(): void {
    this.unit = this.data.unit;
    this.name = this.data.name;
    this.fact = this.data.fact;
    this.plan = this.data.plan;

    if (this.fact > this.plan) {
      this.currentProgress = 100;
      return;
    }
    this.currentProgress = (this.fact / this.plan) * 100;
  }

  deleteChart(): void {
    d3.select(this.chartRef.nativeElement).select('svg').remove();
  }

  newChart(): void {
    this.drawSvgElement();
    this.drawGroupElement();
    this.drawBackgroundTrack();
    this.drawBackgroundDashed();
    this.drawProgress();
    this.drawProgressBorders();
    this.drawProgressIndicator();
    this.drawText();
  }


  drawSvgElement(): void {
    const responsive = {
      width: this.width,
      height: this.width,
      translateY: this.width / 2,
      translateX: this.width / 2,
    };

    this.svgElement = d3
      .select(this.chartRef.nativeElement)
      .append('svg')
      .attr('width', responsive.width)
      .attr('height', responsive.height)
      .append('g')
      .attr(
        'transform',
        `translate(${responsive.translateX},${responsive.translateY})`
      );
  }

  drawGroupElement(): void {
    this.groupElement = this.svgElement
      .append('g')
      .attr('transform', 'rotate(230)');
  }

  drawBackgroundTrack(): void {
    const responsive = {
      itemInnerRadius: this.width / 3.133,
      itemOuterRadius: this.width / 2.35,
    };
    const backgroundTrackArc = this.arcConstructor(
      0,
      260,
      responsive.itemInnerRadius,
      responsive.itemOuterRadius,
      0
    );
    this.groupElement
      .append('path')
      .attr('d', backgroundTrackArc)
      .attr('fill', '#1c1f2b');
  }

  drawBackgroundDashed(): void {
    const responsive = {
      arcsOffset: this.width / 69.629,
      itemWidth: this.width / 117.5,
      itemInnerRadius: this.width / 3.58,
      itemOuterRadius: this.width / 3.418,
    };
    const properties: any = {
      hostElement: this.groupElement,
      arcsStartDeg: this.startDeg,
      arcsEndDeg: this.endDeg,

      arcsOffset: responsive.arcsOffset,
      itemConstructorFunc: this.arcConstructor,

      itemWidth: responsive.itemWidth,

      itemInnerRadius: responsive.itemInnerRadius,

      itemOuterRadius: responsive.itemOuterRadius,
      itemCornerRadius: 0,
      primaryItemFill: '#1c1f2b',
    };

    this.arcsConstructor(properties);
  }

  drawProgress(): void {

    const responsive = {
      itemInnerRadius: this.width / 2.937,
      itemOuterRadius: this.width / 2.457,
    };
    const properties: any = {
      hostElement: this.groupElement,
      arcsStartDeg: this.startDeg + 1,
      arcsEndDeg: this.endDeg - 2,
      arcsOffset: 1,
      itemConstructorFunc: this.arcConstructor,
      itemWidth: 1,

      itemInnerRadius: responsive.itemInnerRadius,

      itemOuterRadius: responsive.itemOuterRadius,
      itemCornerRadius: 0,
      primaryItemFill: '#0089ff',
      secondaryItemFill: '#F7931E',
      separatorDeg: (this.endDeg / 100) * this.currentProgress,
    };

    this.arcsConstructor(properties);
  }

  drawProgressBorders(): void {
    const responsive = {
      itemInnerRadius: this.width / 3.13,
      itemOuterRadius: this.width / 2.35,
    };
    const startBorderProperties: any = {
      hostElement: this.groupElement,
      arcsStartDeg: this.startDeg,
      arcsEndDeg: this.startDeg + 1,
      arcsOffset: 1,
      itemConstructorFunc: this.arcConstructor,
      itemWidth: 1,

      itemInnerRadius: responsive.itemInnerRadius,

      itemOuterRadius: responsive.itemOuterRadius,
      itemCornerRadius: 0,
      primaryItemFill: '#303549',
    };

    const endBorderProperties: any = {
      hostElement: this.groupElement,
      arcsStartDeg: this.endDeg - 1,
      arcsEndDeg: this.endDeg,
      arcsOffset: 1,
      itemConstructorFunc: this.arcConstructor,
      itemWidth: 1,

      itemInnerRadius: responsive.itemInnerRadius,

      itemOuterRadius: responsive.itemOuterRadius,
      itemCornerRadius: 0,
      primaryItemFill: '#303549',
    };

    this.arcsConstructor(startBorderProperties);
    this.arcsConstructor(endBorderProperties);
  }

  drawProgressIndicator(): void {

    const responsive = {
      itemInnerRadius: this.width / 3.13,
      itemOuterRadius: this.width / 2.35,
    };
    const properties: any = {
      hostElement: this.groupElement,
      arcsStartDeg: Math.round((this.endDeg / 100) * this.currentProgress),
      arcsEndDeg: Math.round((this.endDeg / 100) * this.currentProgress),
      arcsOffset: 1,
      itemConstructorFunc: this.arcConstructor,
      itemWidth: 1,

      itemInnerRadius: responsive.itemInnerRadius,

      itemOuterRadius: responsive.itemOuterRadius,
      itemCornerRadius: 0,
      primaryItemFill: '#ffffff',
    };

    this.arcsConstructor(properties);
  }

  drawText(): void {
    const responsive = {
      title1: {
        fontSize: this.width / 19.203,
        posY: this.width / 5.295,
      },
      fact: {
        fontSize: this.width / 12,
        posY: this.width / 12.965,
      },
      line: {

        posX: this.width / 6.4,
        posY: this.width / 20.88,
      },
      plan: {
        fontSize: this.width / 12,
        posY: this.width / 23.5,
      },
      result: {
        fontSize: this.width / 12,
        posY: this.width / 5.081,
      },
      title2: {
        posY: this.width / 4.27,
        posX: this.width / 5.013,
        height: this.width / 6.266,
        width: this.width / 2.506,

        fontSize: this.width / 16,
      },
    };

    this.svgElement
      .append('text')
      .attr('fill', '#606580')

      .attr('font-size', responsive.title1.fontSize)
      .attr('font-family', 'Tahoma')

      .attr('y', -responsive.title1.posY)
      .attr('text-anchor', 'middle')
      .text(`${this.unit}`);


    this.svgElement
      .append('text')
      .attr('fill', '#D7E2F2')

      .attr('font-size', responsive.fact.fontSize)
      .attr('font-family', 'Tahoma')

      .attr('y', -responsive.fact.posY)
      .attr('text-anchor', 'middle')
      .text(`${this.fact.toLocaleString('ru-RU')}`);


    this.svgElement
      .append('line')
      .attr('fill', 'none')


      .attr('x1', -responsive.line.posX)
      .attr('x2', responsive.line.posX)


      .attr('y1', -responsive.line.posY)
      .attr('y2', -responsive.line.posY)
      .attr('stroke-dasharray', '2 2')
      .attr('stroke', '#272A3850')
      .attr('stroke-width', '2');


    this.svgElement
      .append('text')
      .attr('fill', '#0089FF')

      .attr('font-size', responsive.plan.fontSize)
      .attr('font-family', 'Tahoma')

      .attr('y', responsive.plan.posY)
      .attr('text-anchor', 'middle')
      .text(`${this.plan.toLocaleString('ru-RU')}`);


    this.svgElement
      .append('text')
      .attr('fill', '#f7931e')

     .attr('font-size', responsive.result.fontSize)
      .attr('font-family', 'Tahoma')

      .attr('y', responsive.result.posY)
      .attr('text-anchor', 'middle')
      .text(`${(this.fact - this.plan).toLocaleString('ru-RU')}`);


    this.svgElement
      .append('foreignObject')

      .attr('y', responsive.title2.posY)
      .attr('x', -responsive.title2.posX)


      .attr('height', `${responsive.title2.height}`)
      .attr('width', `${responsive.title2.width}`)
      .append('xhtml:div')
      .attr(
        'style',
        `text-align: center; font-size:${responsive.title2.fontSize}px;color: #D7E2F2; width: ${responsive.title2.width}; height: 100%;`
      )
      .text(`${this.name}`);
  }


  arcsConstructor({
                    hostElement,
                    arcsStartDeg,
                    arcsEndDeg,
                    arcsOffset,
                    itemConstructorFunc,
                    itemWidth,
                    itemInnerRadius,
                    itemOuterRadius,
                    itemCornerRadius,
                    primaryItemFill,
                    secondaryItemFill,
                    separatorDeg,
                  }): void {
    for (let i = arcsStartDeg; i <= arcsEndDeg; i++) {
      const arc = itemConstructorFunc(
        i,
        i + itemWidth,
        itemInnerRadius,
        itemOuterRadius,
        itemCornerRadius
      );
      if (!separatorDeg) {
        hostElement.append('path').attr('d', arc).attr('fill', primaryItemFill);
        i = i + arcsOffset;
      }
      if (separatorDeg) {
        hostElement
          .append('path')
          .attr('d', arc)
          .attr('fill', i < separatorDeg ? primaryItemFill : secondaryItemFill);
        i = i + arcsOffset;
      }
    }
  }

  arcConstructor = (
    start: number,
    end: number,
    innerRadius: number,
    outerRadius: number,
    cornerRadius: number
  ) => {
    return d3
      .arc()
      .startAngle(((Math.PI * 2) / 360) * start)
      .endAngle(((Math.PI * 2) / 360) * end)
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius);
  };
}
