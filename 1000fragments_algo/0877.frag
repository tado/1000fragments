uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	vec3 col = vec3(0.025, 0.040, 0.054);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.69) * 1.46 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.65 + 0.24 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.84, 1.69) + ft * 0.73)) * (0.0059 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.953, 1.008, 0.922) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
