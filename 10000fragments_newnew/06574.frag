uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.017, 0.021, 0.038);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 0.67 - float(ci) * 0.12;
		vec2 cp = vec2(sin(ft * 4.0 + 0.61), sin(ft * 4.0)) * 0.76;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.77)) * (0.0083 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
