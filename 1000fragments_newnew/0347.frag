uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.17;
	vec3 col = vec3(0.035, 0.060, 0.070);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.24 + (time * 0.77) * 0.52), sin(fi * 2.24 + (time * 0.77) * 0.52)) * (0.69 + 0.25 * sin(fi * 1.7 + (time * 0.77) * 0.69));
		vec2 bq = abs(p - q) - vec2(0.12, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.97, 1.94) + fi * 0.41 + (time * 0.77) * 1.48)) * (0.025 / (gd + 0.041));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(1.031, 1.000, 0.912) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
