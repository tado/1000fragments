uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	vec3 col = vec3(0.037, 0.014, 0.014);
	for(int ci = 0; ci < 27; ci++){
		float ft = time * 2.14 - float(ci) * 0.07;
		vec2 cp = cos(ft * 3.0) * 0.78 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.80)) * (0.0042 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
