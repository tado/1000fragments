uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.025, 0.031, 0.010);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 2.13 - float(ci) * 0.04;
		vec2 cp = vec2(sin(ft * 3.0 + 0.85), sin(ft * 2.0)) * 0.65;
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.20)) * (0.0067 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 2.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
