uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.005, 0.030, 0.031);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 1.05 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 1.0 + 2.30), sin(ft * 3.0)) * 0.86;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.86)) * (0.0041 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 1.02 + time * 16.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
