uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	vec3 col = vec3(0.033, 0.036, 0.041);
	for(int ci = 0; ci < 27; ci++){
		float ft = time * 1.46 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.46 + 0.26 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.06)) * (0.0101 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 1.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
