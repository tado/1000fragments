uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.68) * 0.68), cos((time * 0.68) * 1.06)) * 0.05;
	vec3 col = mix(vec3(0.026, 0.021, 0.055), vec3(0.028, 0.048, 0.035), clamp(0.5 + p.y * -0.20 + p.x * 0.08, 0.0, 1.0));
	for(int ci = 0; ci < 19; ci++){
		float ft = (time * 0.68) * 0.67 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.54 + 0.11 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(4.836, 5.999, 7.163) + ft * 1.70)) * (0.0059 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.962, 1.022, 0.948);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
