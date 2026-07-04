uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.000, 0.018, 0.050);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 1.58 - float(ci) * 0.04;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.54 + 0.16 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.79)) * (0.0066 / (length(p - cp) + 0.014)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
