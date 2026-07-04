uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	vec3 col = vec3(0.027, 0.007, 0.008);
	for(int ci = 0; ci < 20; ci++){
		float ft = time * 1.29 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 1.0 + 1.24), sin(ft * 5.0)) * 0.62;
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.48)) * (0.0071 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
