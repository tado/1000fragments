uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	vec3 col = vec3(0.017, 0.023, 0.021);
	for(int ci = 0; ci < 24; ci++){
		float ft = (time * 0.74) * 1.87 - float(ci) * 0.05;
		vec2 cp = cos(ft * 4.0) * 0.70 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(1.925, 2.775, 3.624) + ft * 1.78)) * (0.0099 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 1.76 + (time * 0.74) * 13.72);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.971, 0.996, 0.938);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
