uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x = abs(p.x);
	p *= 0.95;
	p = rot2((time * 0.87) * -1.28) * p;
	vec3 col = vec3(0.024, 0.029, 0.050);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.87) * 1.36 * (0.3 + fi * 0.25) + fi * 2.4), cos((time * 0.87) * 0.50 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.43;
		float gd = abs(length(p - q) - 0.28);
		col += (0.5 + 0.5 * cos(vec3(0.685, 1.870, 3.055) + fi * 0.74 + (time * 0.87) * 0.62)) * (0.032 / (gd + 0.010));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(1.055, 0.986, 0.943);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
