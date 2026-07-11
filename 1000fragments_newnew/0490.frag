uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.033, 0.054, 0.026);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.71) * 1.55 * (0.3 + fi * 0.20) + fi * 2.4), cos((time * 0.71) * 0.53 * (0.4 + fi * 0.12) + fi * 1.7)) * 0.73;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.60, 1.20) + fi * 1.85 + (time * 0.71) * 1.47)) * (0.019 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.71)) * 100.0) - 0.5) * 0.12;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.960, 0.996, 0.921) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
