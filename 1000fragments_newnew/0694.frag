uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.023, 0.046, 0.017);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.55 + (time * 0.51) * 1.03), sin(fi * 1.55 + (time * 0.51) * 1.03)) * (0.31 + 0.33 * sin(fi * 1.7 + (time * 0.51) * 0.59));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.41, 0.81) + fi * 1.11 + (time * 0.51) * 0.35)) * (0.021 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.96 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.990, 0.948) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
