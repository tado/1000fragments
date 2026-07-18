uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.y += sin(p.x * 1.21 + (time * 0.84) * 0.71) * 0.14;
	p *= 1.82;
	p = rot2((time * 0.84) * -1.08) * p;
	vec3 col = vec3(0.017, 0.012, 0.062);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.28 + (time * 0.84) * 0.94), sin(fi * 2.28 + (time * 0.84) * 0.94)) * (0.58 + 0.33 * sin(fi * 1.7 + (time * 0.84) * 0.92));
		float gd = abs(length(p - q) - 0.13);
		col += (0.5 + 0.5 * cos(vec3(0.756, 2.385, 4.014) + fi * 0.50 + (time * 0.84) * 0.45)) * (0.037 / (gd + 0.025));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.01));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.050, 0.987, 0.921);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
