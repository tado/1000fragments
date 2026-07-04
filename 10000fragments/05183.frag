uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec3 col = vec3(0.040, 0.018, 0.044);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 1.54 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 5.0 + 2.07), sin(ft * 4.0)) * 0.64;
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.07)) * (0.0104 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
