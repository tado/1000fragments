uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.80;
	vec3 col = vec3(0.000, 0.005, 0.041);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 0.61 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.66 + 0.28 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.72)) * (0.0040 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
