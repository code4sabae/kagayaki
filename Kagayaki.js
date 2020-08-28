class Drawable {
	draw(g) {
	}
	toSVG() {
	}
	drawOval(g, d) {
		g.beginPath();
		const rw = d.width / 2;
		const rh = d.height / 2;
		g.ellipse(d.x + rw, d.y + rh, rw, rh, 0, 0, Math.PI * 2);
		g.fill();
	}
	ovalToSVG(d) {
		const rw = d.width / 2;
		const rh = d.height / 2;
		return `<ellipse cx="${d.x + rw}" cy="${d.y + rh}" rx="${rw}" ry="${rh}" fill="${d.color}"/>`
	};
}

class Cell extends Drawable {
	constructor(d) {
		super();
		this.d = d;
		this.d.color = "red";
	}
	draw(g) {
		g.fillStyle = this.d.color;
		this.drawOval(g, this.d);
	}
	toSVG() {
		return this.ovalToSVG(this.d);
	}
};
class Eye extends Drawable {
	constructor(d) {
		super();
		this.d = d;
		this.d.color = "white";

		const th = d.dir / 180 * Math.PI;
		const w = d.width / 2;
		const h = d.height / 2;
		const cx = d.x + w;
		const cy = d.y + h;
		const r = Math.max(w, h) * .9;
		const x = cx + Math.cos(th) * (w * .54) - r / 2;
		const y = cy + Math.sin(th) * (h * .54) - r / 2;
		this.d2 = { x, y, width: r, height: r, color: "#0A65FF" };
	}
	draw(g) {
		const d = this.d;
		g.fillStyle = d.color;
		this.drawOval(g, d);
		const d2 = this.d2;
		g.fillStyle = d2.color;
		this.drawOval(g, d2);
	}
	toSVG() {
		return this.ovalToSVG(this.d) + this.ovalToSVG(this.d2);
	}
};

class Kagayaki extends Drawable {
	constructor() {
		super();
		this.d = [
			new Cell({width: 116, height: 120, x: 194, y: 0}),
			new Cell({width: 140, height: 66, x: 220, y: 94}),
			new Cell({width: 85, height: 96, x: 245, y: 144}),
			new Cell({width: 125, height: 114, x: 216, y: 226}),
			new Cell({width: 105, height: 110, x: 150, y: 288}),
			new Cell({width: 75, height: 80, x: 85, y: 294}),
			new Cell({width: 56, height: 96, x: 60, y: 230}),
			new Cell({width: 104, height: 100, x: 5, y: 166}),
			new Cell({width: 80, height: 86, x: 0, y: 84}),
			new Cell({width: 82, height: 82, x: 54, y: 110}),
			new Cell({width: 80, height: 86, x: 64, y: 44}),
			new Cell({width: 88, height: 88, x: 113, y: 0}),
			new Eye({width: 54, height: 52, x: 239, y: 13, dir: -45 }),
			new Eye({width: 46, height: 46, x: 10, y: 102, dir: -135 }),
			new Eye({width: 46, height: 46, x: 48, y: 199, dir: -90 }),
			new Eye({width: 40, height: 40, x: 177, y: 344, dir: 90 }),
			new Eye({width: 64, height: 58, x: 272, y: 259, dir: -30 }),
		];
	}
	draw(g) {
		g.save();
		g.translate(70, 40);
		for (const d of this.d) {
			d.draw(g);
		}
		g.restore();
	}
	toSVG() {
		const w = 500;
		const h = 500;
		const s = [];
		s.push(`<svg viewBox="-70 -40 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`);
		for (const d of this.d) {
			s.push(d.toSVG());
		}
		s.push("</svg>");
		return s.join("\n");
	}
}

export { Kagayaki };
