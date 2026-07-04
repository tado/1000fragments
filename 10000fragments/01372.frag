uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.025, 0.008, 0.034);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 1.01 - float(ci) * 0.04;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.41 + 0.20 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.53)) * (0.0119 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
