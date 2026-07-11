uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.020, 0.016, 0.016);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.12 - float(ci) * 0.12;
		vec2 cp = vec2(sin(ft * 1.0 + 2.20), sin(ft * 5.0)) * 0.66;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.80)) * (0.0085 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
