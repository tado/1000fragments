uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.70;
	p = rot2((time * 0.60) * -0.44) * p;
	vec3 col = vec3(0.033, 0.037, 0.073);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.60) * 1.06 * (0.3 + fi * 0.12) + fi * 2.4), cos((time * 0.60) * 1.08 * (0.4 + fi * 0.24) + fi * 1.7)) * 0.85;
		float gd = abs(length(p - q) - 0.27);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.51, 1.02) + fi * 1.06 + (time * 0.60) * 0.93)) * (0.011 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(1.012, 0.971, 1.017) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
