uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	vec3 col = vec3(0.033, 0.033, 0.047);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 1.80 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.67 + 0.18 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.96)) * (0.0109 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
