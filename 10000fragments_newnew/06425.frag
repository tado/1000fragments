uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.032, 0.016, 0.041);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 0.83 - float(ci) * 0.04;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.50 + 0.22 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.08)) * (0.0108 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
