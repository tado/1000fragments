uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.75;
	vec3 col = vec3(0.021, 0.024, 0.008);
	for(int ci = 0; ci < 16; ci++){
		float ft = (time * 0.79) * 2.17 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 2.0 + 1.48), sin(ft * 4.0)) * 0.87;
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.70, 1.40) + ft * 1.35)) * (0.0089 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.994, 1.020, 1.016) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
