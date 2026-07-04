uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	vec3 col = vec3(0.027, 0.005, 0.025);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 2.19 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.57 + 0.12 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.52)) * (0.0119 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
