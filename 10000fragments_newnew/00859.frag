uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	vec3 col = vec3(0.004, 0.033, 0.052);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 1.81 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.48 + 0.14 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.63)) * (0.0078 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
