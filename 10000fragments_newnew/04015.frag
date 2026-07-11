uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.036, 0.006, 0.022);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 1.58 - float(ci) * 0.06;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.49 + 0.22 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.32)) * (0.0087 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 2.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
