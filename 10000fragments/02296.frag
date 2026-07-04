uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.030, 0.028, 0.032);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 1.05 - float(ci) * 0.09;
		vec2 cp = cos(ft * 5.0) * 0.88 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.95)) * (0.0115 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
