uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	vec3 col = vec3(0.000, 0.020, 0.034);
	for(int ci = 0; ci < 19; ci++){
		float ft = (time * 0.81) * 1.59 - float(ci) * 0.04;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.70 + 0.12 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.86) + ft * 0.56)) * (0.0050 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.86 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 1.011, 1.007) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
