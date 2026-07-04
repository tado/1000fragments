uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	vec3 col = vec3(0.033, 0.001, 0.008);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 1.51 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 1.0 + 0.98), sin(ft * 1.0)) * 0.58;
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.56)) * (0.0057 / (length(p - cp) + 0.014)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
