uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.027, 0.026, 0.002);
	for(int ci = 0; ci < 16; ci++){
		float ft = (time * 0.76) * 1.27 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.52 + 0.15 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.40, 0.80) + ft * 1.82)) * (0.0117 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 2.44 + (time * 0.76) * 14.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.019, 1.020, 0.986) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
