uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	vec3 col = vec3(0.013, 0.012, 0.057);
	for(int ci = 0; ci < 27; ci++){
		float ft = time * 1.10 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.66 + 0.23 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.82)) * (0.0052 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
