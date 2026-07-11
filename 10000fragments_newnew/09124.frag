uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	vec3 col = vec3(0.003, 0.030, 0.050);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 0.99 - float(ci) * 0.08;
		vec2 cp = cos(ft * 6.0) * 0.72 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.87)) * (0.0119 / (length(p - cp) + 0.030)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
