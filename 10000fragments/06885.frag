uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.023, 0.013, 0.006);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 0.80 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.61 + 0.10 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.73)) * (0.0111 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
