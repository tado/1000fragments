uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p.y += sin(p.x * 2.94 + (time * 0.59) * 1.45) * 0.19;
	vec3 col = vec3(0.010, 0.026, 0.039);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.59) * 1.63 - float(ci) * 0.10;
		vec2 cp = cos(ft * 6.0) * 0.69 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.06, 2.12) + ft * 1.06)) * (0.0051 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.927, 0.984, 1.026) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
