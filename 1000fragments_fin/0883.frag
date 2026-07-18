uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 0.85;
	vec3 col = mix(vec3(0.029, 0.070, 0.053), vec3(0.043, 0.068, 0.058), clamp(0.5 + p.y * -0.21 + p.x * -0.06, 0.0, 1.0));
	for(int ci = 0; ci < 27; ci++){
		float ft = (time * 0.57) * 0.88 - float(ci) * 0.06;
		vec2 cp = cos(ft * 2.0) * 0.71 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.153, 2.042, 3.932) + ft * 1.80)) * (0.0066 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.015, 0.965, 1.016);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
