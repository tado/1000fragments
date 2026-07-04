uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	vec3 col = vec3(0.007, 0.021, 0.053);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 1.94 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 4.0 + 1.44), sin(ft * 2.0)) * 0.55;
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.40)) * (0.0070 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 2.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
