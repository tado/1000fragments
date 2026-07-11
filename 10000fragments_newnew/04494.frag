uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	vec3 col = vec3(0.001, 0.029, 0.001);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 1.80 - float(ci) * 0.04;
		vec2 cp = vec2(sin(ft * 5.0 + 0.12), sin(ft * 4.0)) * 0.65;
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.01)) * (0.0098 / (length(p - cp) + 0.010)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
