uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.023, 0.019, 0.056);
	for(int ci = 0; ci < 26; ci++){
		float ft = (time * 0.73) * 1.15 - float(ci) * 0.08;
		vec2 cp = cos(ft * 4.0) * 0.72 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.39, 2.78) + ft * 1.74)) * (0.0053 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(0.926, 0.975, 1.039) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
