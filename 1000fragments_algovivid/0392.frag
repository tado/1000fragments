uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.48;
	vec3 col = vec3(0.008, 0.036, 0.073);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.08 + (time * 0.70) * 0.84), sin(fi * 2.08 + (time * 0.70) * 0.84)) * (0.50 + 0.34 * sin(fi * 1.7 + (time * 0.70) * 1.79));
		float gd = abs(length(p - q) - 0.16);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.09, 2.18) + fi * 0.85 + (time * 0.70) * 0.98)) * (0.020 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.971, 0.949) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
