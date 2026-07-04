uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.020, 0.040, 0.008);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 1.58 - float(ci) * 0.11;
		vec2 cp = cos(ft * 2.0) * 0.63 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.61)) * (0.0073 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
