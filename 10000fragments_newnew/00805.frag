uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	vec3 col = vec3(0.007, 0.034, 0.044);
	for(int ci = 0; ci < 20; ci++){
		float ft = time * 2.17 - float(ci) * 0.12;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.60 + 0.30 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.39)) * (0.0105 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
