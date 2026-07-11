uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	vec3 col = vec3(0.023, 0.034, 0.050);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 2.20 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 1.0 + 2.95), sin(ft * 2.0)) * 0.74;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.84)) * (0.0044 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.16 * sin(gl_FragCoord.y * 1.56 + time * 14.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
