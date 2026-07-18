uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y += sin(p.x * 1.88 + (time * 0.75) * 1.37) * 0.11;
	p *= 1.36;
	vec3 col = mix(vec3(0.026, 0.050, 0.083), vec3(0.012, 0.069, 0.057), clamp(0.5 + p.y * 0.50 + p.x * 0.29, 0.0, 1.0));
	for(int ci = 0; ci < 17; ci++){
		float ft = (time * 0.75) * 1.96 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 2.0 + 2.64), sin(ft * 2.0)) * 0.67;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(5.846, 7.202, 8.558) + ft * 1.05)) * (0.0093 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(0.983, 1.001, 0.949);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
