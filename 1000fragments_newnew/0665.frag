uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.60;
	vec3 col = vec3(0.047, 0.051, 0.041);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.73) * 1.11 * (0.3 + fi * 0.12) + fi * 2.4), cos((time * 0.73) * 1.42 * (0.4 + fi * 0.11) + fi * 1.7)) * 0.68;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.65, 1.30) + fi * 0.83 + (time * 0.73) * 1.24)) * (0.029 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.13 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.990, 0.981, 1.010) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
