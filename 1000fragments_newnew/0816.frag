uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	p = rot2((time * 0.67) * 0.62) * p;
	vec3 col = vec3(0.035, 0.047, 0.057);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.42 + (time * 0.67) * 1.66), sin(fi * 2.42 + (time * 0.67) * 1.66)) * (0.68 + 0.21 * sin(fi * 1.7 + (time * 0.67) * 1.46));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.64, 1.27) + fi * 1.87 + (time * 0.67) * 0.50)) * (0.015 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(1.007, 0.979, 1.008) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
