uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 1.44;
	p *= 1.57;
	vec3 col = vec3(0.016, 0.013, 0.007);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.61) * 2.00 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 5.0 + 2.03), sin(ft * 1.0)) * 0.71;
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(3.120, 4.363, 5.605) + ft * 1.12)) * (0.0078 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.007, 0.981, 0.945);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
