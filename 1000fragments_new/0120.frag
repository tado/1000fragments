uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.014, 0.033, 0.038);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 1.69 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 1.0 + 0.04), sin(ft * 4.0)) * 0.64;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.19)) * (0.0051 / (length(p - cp) + 0.030)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 2.99, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
