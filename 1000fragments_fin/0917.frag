uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x += p.y * 0.53;
	p.y += sin(p.x * 2.16 + (time * 0.76) * 1.32) * 0.17;
	p *= 1.28;
	vec3 col = mix(vec3(0.022, 0.036, 0.051), vec3(0.028, 0.014, 0.039), clamp(0.5 + p.y * -0.30 + p.x * -0.18, 0.0, 1.0));
	for(int ci = 0; ci < 30; ci++){
		float ft = (time * 0.76) * 1.63 - float(ci) * 0.04;
		vec2 cp = cos(ft * 4.0) * 0.66 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(1.728, 3.468, 5.207) + ft * 1.12)) * (0.0099 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.15 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.989, 0.996, 1.006);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.22 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
