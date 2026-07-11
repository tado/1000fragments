uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.028, 0.015, 0.051);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 2.02 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.55 + 0.27 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.95)) * (0.0071 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
