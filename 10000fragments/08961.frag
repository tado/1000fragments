uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	vec3 col = vec3(0.020, 0.035, 0.055);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 1.99 - float(ci) * 0.07;
		vec2 cp = cos(ft * 6.0) * 0.71 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.06)) * (0.0106 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
