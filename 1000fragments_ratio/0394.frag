uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y += sin(p.x * 2.50 + (time * 0.51) * 1.49) * 0.09;
	p *= 2.53;
	vec3 col = vec3(0.038, 0.055, 0.015);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.38 + (time * 0.51) * 1.95), sin(fi * 2.38 + (time * 0.51) * 1.95)) * (0.76 + 0.35 * sin(fi * 1.7 + (time * 0.51) * 0.73));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.96, 1.92) + fi * 1.05 + (time * 0.51) * 0.48)) * (0.036 / (gd + 0.018));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(1.050, 0.974, 0.911) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
