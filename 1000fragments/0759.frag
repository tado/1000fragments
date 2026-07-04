uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	vec3 col = vec3(0.004, 0.020, 0.048);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.97 - float(ci) * 0.09;
		vec2 cp = cos(ft * 6.0) * 0.56 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.09)) * (0.0050 / (length(p - cp) + 0.014)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
