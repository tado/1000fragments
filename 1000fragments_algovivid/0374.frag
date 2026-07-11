uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.026, 0.035, 0.055);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.49 + 0.31 * vec2(sin((time * 0.69) * 2.68 + hc.x * 6.2831853), cos((time * 0.69) * 2.39 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.11);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.46, 2.91) + fi * 0.59 + (time * 0.69) * 1.50)) * (0.030 / (gd + 0.048));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 2.49 + (time * 0.69) * 13.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(0.983, 1.023, 0.926) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
