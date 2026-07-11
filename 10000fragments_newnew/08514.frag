uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.015, 0.014, 0.053);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 0.95 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.68 + 0.13 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.86)) * (0.0087 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
