uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	vec3 col = vec3(0.023, 0.013, 0.043);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 1.75 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 5.0 + 1.85), sin(ft * 1.0)) * 0.54;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.86)) * (0.0042 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
