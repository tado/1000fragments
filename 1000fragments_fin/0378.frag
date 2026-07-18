uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 1.06;
	vec3 col = mix(vec3(0.024, 0.029, 0.071), vec3(0.017, 0.060, 0.081), clamp(0.5 + p.y * -0.41 + p.x * 0.28, 0.0, 1.0));
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.77) * 0.95 * (0.3 + fi * 0.22) + fi * 2.4), cos((time * 0.77) * 1.57 * (0.4 + fi * 0.06) + fi * 1.7)) * 0.96;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(5.068, 6.815, 8.562) + fi * 1.83 + (time * 0.77) * 0.54)) * (0.010 / (gd + 0.044));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.937, 0.988, 1.051);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
