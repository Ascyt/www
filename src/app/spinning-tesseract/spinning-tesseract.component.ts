import { Component, ElementRef, signal, Signal } from '@angular/core';
import { Vector4 } from './vector4';
import { RotationalPlane } from './rotational-plane';
import { Vector2 } from './vector2';
import { rotateVectorAroundPlane } from './matrix-multiplication';

@Component({
  selector: 'app-spinning-tesseract',
  standalone: true,
  imports: [],
  templateUrl: './spinning-tesseract.component.html',
  styleUrl: './spinning-tesseract.component.scss'
})
export class SpinningTesseractComponent {
  constructor(private elementRef:ElementRef) {
    this.startAnimation();
  }

  public readonly svgSize = {
    width:  512,
    height: 512
  };

  public get svgColor():string {
    return getComputedStyle(this.elementRef.nativeElement.ownerDocument.documentElement)
       .getPropertyValue('--link').trim();
  }

  private readonly vertices:Vector4[] = [
    new Vector4(-1, -1, -1, -1), // 0
    
    new Vector4(1, -1, -1, -1), // 1
    new Vector4(1, 1, -1, -1), // 2
    new Vector4(-1, 1, -1, -1), // 3
    new Vector4(-1, 1, 1, -1), // 4
    new Vector4(1, 1, 1, -1), // 5
    new Vector4(1, -1, 1, -1), // 6
    new Vector4(-1, -1, 1, -1),  // 7

    new Vector4(-1, -1, -1, 1), // 8
    new Vector4(1, -1, -1, 1), // 9
    new Vector4(1, 1, -1, 1), // 10
    new Vector4(-1, 1, -1, 1), // 11
    new Vector4(-1, 1, 1, 1), // 12
    new Vector4(1, 1, 1, 1), // 13
    new Vector4(1, -1, 1, 1), // 14
    new Vector4(-1, -1, 1, 1)  // 15
  ];

  private readonly edges:number[][] = [
    [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 0 ], // First square
    [ 4, 5 ], [ 5, 6 ], [ 6, 7 ], [ 7, 4 ], // Second square
    [ 0, 7 ], [ 1, 6 ], [ 2, 5 ], [ 3, 4 ], // Connecting first and second square to form a cube

    [ 8, 9 ], [ 9, 10 ], [ 10, 11 ], [ 11, 8 ], // First square
    [ 12, 13 ], [ 13, 14 ], [ 14, 15 ], [ 15, 12 ], // Second Square
    [ 8, 15 ], [ 9, 14 ], [ 10, 13 ], [ 11, 12 ], // Connecting first and second square to form a cube

    [ 0, 8 ], [ 1, 9 ], [ 2, 10 ], [ 3, 11 ], // Connecting the two cubes
    [ 4, 12 ], [ 5, 13 ], [ 6, 14 ], [ 7, 15 ] // Connecting the two cubes
  ];

  private worldToScreenCoordinates(v:Vector4):Vector2 {
    // Orthographic projection by ignoring the z and w coordinates
    const padding:number = 10;
    const scale = 0.5;
    return {
      x: (v.x * scale + 1) / 2 * (this.svgSize.width - padding * 2) + padding,
      y: (v.y * scale + 1) / 2 * (this.svgSize.height - padding * 2) + padding
    };
  }

  public updatePositions():void {
    const rotatedVertices:Vector4[] = this.vertices.map(v => this.rotateVertex(v));

    this.vertexPositions.set(rotatedVertices.map(v => this.worldToScreenCoordinates(v)));

    this.edgePositions.set(this.edges.map(edge => edge.map(i => this.vertexPositions()[i])));
  }

  private rotateVertex(v:Vector4) {
    let rotated:Vector4 = v;

    for (let i = 0; i < 6; i++) {
      rotated = rotateVectorAroundPlane(rotated, i as RotationalPlane, this.rotations[i]);
    }

    return rotated;
  }

  public rotations:number[] = [
    0, // XY
    0, // XZ
    0, // XW
    0, // YZ
    0, // YW
    0, // ZW
  ];

  public rotationVelocities:number[] = [
    0, // XY
    0, // XZ
    0, // XW
    0, // YZ
    0, // YW
    0, // ZW
  ];

  public vertexPositions = signal<Vector2[]>([]);
  public edgePositions = signal<Vector2[][]>([]);

  private startAnimation():void {
    this.randomizeRotationVelocities();

    const animate = (currentTime: number) => {
      this.update(currentTime);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  private randomizeRotationVelocities():void {
    this.rotationVelocities = this.rotationVelocities.map(() => ((Math.random() + 1) * 10));
  }

  private update(currentTime: number): void {
    for (let i = 1; i < 6; i++) { // skip XY (camera tilt)
      this.rotations[i] = Math.sin(this.rotationVelocities[i] * (currentTime / 1000 * 0.005)) * Math.PI;
    }

    this.updatePositions();
  }
}
