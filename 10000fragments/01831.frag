uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec3 col = vec3(0.023, 0.036, 0.034);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.44 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.63 + 0.11 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.82)) * (0.0058 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
