uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.66) * 0.32), cos((time * 0.66) * 0.73)) * 0.11;
	p.y += sin(p.x * 2.65 + (time * 0.66) * 0.87) * 0.15;
	vec3 col = vec3(0.020, 0.026, 0.052);
	for(int ci = 0; ci < 28; ci++){
		float ft = (time * 0.66) * 1.78 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 4.0 + 1.87), sin(ft * 3.0)) * 0.72;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.38, 2.75) + ft * 1.39)) * (0.0117 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.025, 0.973, 0.948) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
