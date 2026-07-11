uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.025, 0.030, 0.050);
	for(int ci = 0; ci < 27; ci++){
		float ft = time * 1.05 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 3.0 + 0.14), sin(ft * 3.0)) * 0.65;
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.64)) * (0.0069 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
