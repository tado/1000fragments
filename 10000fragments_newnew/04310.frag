uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.010, 0.026, 0.023);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 1.76 - float(ci) * 0.05;
		vec2 cp = cos(ft * 2.0) * 0.60 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.65)) * (0.0043 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.17 * sin(gl_FragCoord.y * 1.35 + time * 17.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
