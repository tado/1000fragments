uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 0.97;
	p.y += sin(p.x * 2.62 + (time * 0.82) * 0.65) * 0.20;
	p *= 1.53;
	vec3 col = mix(vec3(0.032, 0.032, 0.041), vec3(0.024, 0.040, 0.031), clamp(0.5 + p.y * -0.22 + p.x * 0.23, 0.0, 1.0));
	for(int ci = 0; ci < 28; ci++){
		float ft = (time * 0.82) * 0.92 - float(ci) * 0.04;
		vec2 cp = vec2(sin(ft * 4.0 + 1.39), sin(ft * 3.0)) * 0.72;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(5.642, 6.687, 7.732) + ft * 1.35)) * (0.0089 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(0.935, 0.984, 1.051);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
