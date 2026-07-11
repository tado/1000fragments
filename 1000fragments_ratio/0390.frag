uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 2.25;
	p = rot2((time * 0.52) * 1.40) * p;
	vec3 col = vec3(0.020, 0.029, 0.054);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.52) * 1.54 * (0.3 + fi * 0.08) + fi * 2.4), cos((time * 0.52) * 0.71 * (0.4 + fi * 0.08) + fi * 1.7)) * 0.53;
		float gd = abs(length(p - q) - 0.22);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.10, 2.21) + fi * 0.95 + (time * 0.52) * 1.42)) * (0.017 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col = clamp(col, 0.0, 1.0) * vec3(1.057, 0.985, 0.924) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
