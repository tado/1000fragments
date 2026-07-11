uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.014, 0.014, 0.023);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 0.73 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 1.0 + 2.66), sin(ft * 4.0)) * 0.57;
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.58)) * (0.0114 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
