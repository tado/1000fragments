uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.033, 0.033, 0.060);
	for(int ci = 0; ci < 18; ci++){
		float ft = (time * 0.80) * 1.90 - float(ci) * 0.07;
		vec2 cp = cos(ft * 4.0) * 0.72 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.64, 1.27) + ft * 1.99)) * (0.0100 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.030, 0.945, 1.010) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
