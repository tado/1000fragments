uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.53;
	p.x += p.y * -0.50;
	p *= 2.64;
	p = rot2((time * 0.66) * -0.36) * p;
	vec3 col = vec3(0.005, 0.017, 0.044);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.66) * 0.98 * (0.3 + fi * 0.13) + fi * 2.4), cos((time * 0.66) * 1.40 * (0.4 + fi * 0.07) + fi * 1.7)) * 0.55;
		vec2 bq = abs(p - q) - vec2(0.15, 0.11);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.59, 1.19) + fi * 1.74 + (time * 0.66) * 1.15)) * (0.017 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.053, 0.987, 0.934) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
