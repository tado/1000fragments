uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y);
	vec3 col = mix(vec3(0.062, 0.032, 0.067), vec3(0.038, 0.067, 0.098), clamp(0.5 + p.y * 0.23 + p.x * 0.29, 0.0, 1.0));
	for(int ci = 0; ci < 16; ci++){
		float ft = (time * 0.63) * 1.13 - float(ci) * 0.06;
		vec2 cp = cos(ft * 5.0) * 0.77 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(4.670, 5.669, 6.669) + ft * 1.37)) * (0.0088 / (length(p - cp) + 0.010)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.20 * sin(gl_FragCoord.y * 2.91 + (time * 0.63) * 17.53);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.048, 0.991, 0.930);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
