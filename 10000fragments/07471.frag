uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.017, 0.010, 0.016);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.38 - float(ci) * 0.06;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.52 + 0.14 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.91)) * (0.0101 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
