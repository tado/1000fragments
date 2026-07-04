uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.010, 0.030, 0.036);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.15 - float(ci) * 0.08;
		vec2 cp = cos(ft * 2.0) * 0.73 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.80)) * (0.0091 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
