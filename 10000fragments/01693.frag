uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.038, 0.002, 0.033);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 2.16 - float(ci) * 0.06;
		vec2 cp = cos(ft * 2.0) * 0.59 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.84)) * (0.0052 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
