uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.032, 0.005, 0.019);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 2.10 - float(ci) * 0.10;
		vec2 cp = cos(ft * 4.0) * 0.75 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.16)) * (0.0078 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
