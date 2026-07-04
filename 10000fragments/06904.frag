uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	vec3 col = vec3(0.018, 0.005, 0.016);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 0.67 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 4.0 + 0.92), sin(ft * 2.0)) * 0.58;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.53)) * (0.0098 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
