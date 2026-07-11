uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.026, 0.022, 0.045);
	for(int ci = 0; ci < 27; ci++){
		float ft = (time * 0.63) * 1.46 - float(ci) * 0.08;
		vec2 cp = cos(ft * 2.0) * 0.51 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.07, 2.13) + ft * 0.87)) * (0.0050 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.964, 1.019, 0.925) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
