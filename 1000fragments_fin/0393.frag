uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 0.70;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 2.00;
	vec3 col = mix(vec3(0.035, 0.028, 0.070), vec3(0.019, 0.043, 0.090), clamp(0.5 + p.y * 0.32 + p.x * 0.14, 0.0, 1.0));
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 0.55 + (time * 0.92) * 0.97), sin(fi * 0.55 + (time * 0.92) * 0.97)) * (0.43 + 0.24 * sin(fi * 1.7 + (time * 0.92) * 1.48));
		float gd = abs(length(p - q) - 0.19);
		col += (0.5 + 0.5 * cos(vec3(3.579, 5.601, 7.624) + fi * 1.33 + (time * 0.92) * 0.66)) * (0.030 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.032, 1.010, 0.941);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
