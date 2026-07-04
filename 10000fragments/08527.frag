uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.008, 0.012, 0.018);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 0.69 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.45 + 0.18 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.68)) * (0.0100 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
