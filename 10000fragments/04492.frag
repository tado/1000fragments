uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	vec3 col = vec3(0.014, 0.039, 0.027);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 0.73 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.44 + 0.18 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.97)) * (0.0042 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
