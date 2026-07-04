uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec3 col = vec3(0.001, 0.032, 0.034);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 0.66 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.50 + 0.30 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.36)) * (0.0077 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
