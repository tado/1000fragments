uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.77 + (time * 0.53) * 1.35) * 0.06;
	vec3 col = vec3(0.015, 0.015, 0.031);
	for(int ci = 0; ci < 24; ci++){
		float ft = (time * 0.53) * 1.70 - float(ci) * 0.12;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.52 + 0.21 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.18, 2.37) + ft * 1.04)) * (0.0065 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.059, 0.978, 0.939) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
