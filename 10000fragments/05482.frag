uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	vec3 col = vec3(0.037, 0.008, 0.011);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 0.66 - float(ci) * 0.10;
		vec2 cp = cos(ft * 6.0) * 0.71 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.72)) * (0.0111 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
