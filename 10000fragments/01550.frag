uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	vec3 col = vec3(0.031, 0.006, 0.038);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 1.85 - float(ci) * 0.05;
		vec2 cp = cos(ft * 2.0) * 0.64 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.03)) * (0.0063 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
