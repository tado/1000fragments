uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	vec3 col = vec3(0.036, 0.024, 0.019);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 1.78 - float(ci) * 0.09;
		vec2 cp = cos(ft * 2.0) * 0.86 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.41)) * (0.0060 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
