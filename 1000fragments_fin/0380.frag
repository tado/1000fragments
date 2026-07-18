uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x = abs(p.x) - 0.56;
	p *= 0.86;
	p *= 2.03;
	p = rot2((time * 0.57) * -1.24) * p;
	vec3 col = vec3(0.030, 0.016, 0.070);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.57) * 1.10 * (0.3 + fi * 0.21) + fi * 2.4), cos((time * 0.57) * 1.41 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.78;
		float gd = abs(length(p - q) - 0.14);
		col += (0.5 + 0.5 * cos(vec3(3.245, 4.612, 5.980) + fi * 1.29 + (time * 0.57) * 1.45)) * (0.020 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.944, 0.984, 1.034);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
