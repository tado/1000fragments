uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.022, 0.001, 0.057);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 1.11 - float(ci) * 0.12;
		vec2 cp = cos(ft * 5.0) * 0.74 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.85)) * (0.0087 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
