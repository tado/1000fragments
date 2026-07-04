uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.018, 0.029, 0.054);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 0.66 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.70 + 0.30 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.32)) * (0.0047 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
