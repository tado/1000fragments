uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.019, 0.009, 0.053);
	for(int ci = 0; ci < 29; ci++){
		float ft = (time * 0.52) * 2.11 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 3.0 + 1.90), sin(ft * 1.0)) * 0.90;
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.71, 1.42) + ft * 1.17)) * (0.0068 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.955, 1.012, 0.955) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
