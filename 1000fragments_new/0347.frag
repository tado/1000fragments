uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec3 col = vec3(0.007, 0.023, 0.006);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.21 - float(ci) * 0.04;
		vec2 cp = vec2(sin(ft * 3.0 + 2.74), sin(ft * 3.0)) * 0.55;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.59)) * (0.0080 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 1.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
