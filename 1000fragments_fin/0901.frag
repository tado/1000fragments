uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	vec3 col = mix(vec3(0.048, 0.045, 0.060), vec3(0.064, 0.032, 0.089), clamp(0.5 + p.y * 0.13 + p.x * 0.26, 0.0, 1.0));
	for(int ci = 0; ci < 20; ci++){
		float ft = (time * 0.61) * 1.78 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.68 + 0.15 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(3.617, 5.085, 6.554) + ft * 1.87)) * (0.0066 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.021, 0.968, 1.008);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
