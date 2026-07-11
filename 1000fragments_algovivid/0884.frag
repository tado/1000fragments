uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.96 + (time * 0.84) * 0.73) * 0.09;
	p *= 1.15;
	vec3 col = vec3(0.036, 0.028, 0.055);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.84) * 1.54 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.55 + 0.20 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.64, 1.28) + ft * 1.92)) * (0.0055 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.995, 0.974, 1.023) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
