uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p = p.yx;
	p *= 1.02;
	vec3 col = vec3(0.032, 0.010, 0.046);
	for(int ci = 0; ci < 19; ci++){
		float ft = (time * 0.55) * 1.11 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.70 + 0.25 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(1.138, 2.889, 4.640) + ft * 1.48)) * (0.0109 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(1.012, 0.947, 1.009);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
