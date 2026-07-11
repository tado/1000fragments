uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.033, 0.024, 0.005);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.62) * 0.90 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 3.0 + 1.47), sin(ft * 2.0)) * 0.89;
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.65, 1.29) + ft * 0.61)) * (0.0095 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 1.008, 0.949) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
