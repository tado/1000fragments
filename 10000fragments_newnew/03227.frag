uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.019, 0.006, 0.044);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 0.83 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 1.0 + 0.92), sin(ft * 1.0)) * 0.82;
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.49)) * (0.0080 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
