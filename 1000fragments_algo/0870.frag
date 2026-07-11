uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	vec3 col = vec3(0.039, 0.017, 0.020);
	for(int ci = 0; ci < 18; ci++){
		float ft = (time * 0.66) * 1.87 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.50 + 0.19 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.75, 1.50) + ft * 1.42)) * (0.0094 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.950, 1.015) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
