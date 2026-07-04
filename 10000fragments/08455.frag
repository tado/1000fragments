uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	vec3 col = vec3(0.034, 0.002, 0.019);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 0.95 - float(ci) * 0.08;
		vec2 cp = cos(ft * 5.0) * 0.78 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.82)) * (0.0068 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
