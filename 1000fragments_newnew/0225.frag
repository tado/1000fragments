uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.005, 0.055, 0.012);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.26 + (time * 0.51) * 0.99), sin(fi * 2.26 + (time * 0.51) * 0.99)) * (0.53 + 0.29 * sin(fi * 1.7 + (time * 0.51) * 0.63));
		vec2 bq = abs(p - q) - vec2(0.09, 0.15);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.94, 1.89) + fi * 0.41 + (time * 0.51) * 1.08)) * (0.019 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.979, 0.998, 0.958) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
