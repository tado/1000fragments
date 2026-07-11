uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	vec3 col = vec3(0.016, 0.024, 0.004);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 0.98 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.62 + 0.30 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.62)) * (0.0041 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
