uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.30;
	vec3 col = vec3(0.013, 0.009, 0.045);
	for(int ci = 0; ci < 23; ci++){
		float ft = (time * 0.54) * 2.10 - float(ci) * 0.07;
		vec2 cp = cos(ft * 3.0) * 0.77 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.67, 1.33) + ft * 1.22)) * (0.0053 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.994, 1.003, 0.997) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
