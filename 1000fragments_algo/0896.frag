uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	vec3 col = vec3(0.017, 0.021, 0.047);
	for(int ci = 0; ci < 29; ci++){
		float ft = (time * 0.56) * 1.06 - float(ci) * 0.04;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.56 + 0.30 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.43, 0.86) + ft * 1.91)) * (0.0070 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.058, 1.002, 0.941) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
