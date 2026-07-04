uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	vec3 col = vec3(0.005, 0.006, 0.025);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.78 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.64 + 0.15 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.54)) * (0.0087 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
