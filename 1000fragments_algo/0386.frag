uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	p.x = abs(p.x) - 0.37;
	p *= 0.82;
	vec3 col = vec3(0.033, 0.002, 0.001);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.60) * 0.52 * (0.3 + fi * 0.07) + fi * 2.4), cos((time * 0.60) * 1.30 * (0.4 + fi * 0.23) + fi * 1.7)) * 0.79;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.49, 0.98) + fi * 0.64 + (time * 0.60) * 0.25)) * (0.014 / (gd + 0.049));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.88));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.001, 1.003, 0.990) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
