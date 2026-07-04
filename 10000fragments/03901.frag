uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.007, 0.027, 0.034);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 1.05 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 4.0 + 2.96), sin(ft * 4.0)) * 0.69;
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.39)) * (0.0114 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
