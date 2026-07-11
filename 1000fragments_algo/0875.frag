uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.021, 0.010, 0.054);
	for(int ci = 0; ci < 24; ci++){
		float ft = (time * 0.67) * 1.96 - float(ci) * 0.10;
		vec2 cp = cos(ft * 3.0) * 0.53 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.90, 1.80) + ft * 1.50)) * (0.0109 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(0.952, 1.019, 0.930) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
