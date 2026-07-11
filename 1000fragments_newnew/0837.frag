uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.97;
	p = rot2((time * 0.58) * -0.74) * p;
	vec3 col = vec3(0.002, 0.022, 0.000);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.58) * 0.59 * (0.3 + fi * 0.18) + fi * 2.4), cos((time * 0.58) * 0.91 * (0.4 + fi * 0.18) + fi * 1.7)) * 0.56;
		vec2 bq = abs(p - q) - vec2(0.18, 0.22);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.77, 1.55) + fi * 1.11 + (time * 0.58) * 0.58)) * (0.022 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.962, 1.025, 0.931) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
