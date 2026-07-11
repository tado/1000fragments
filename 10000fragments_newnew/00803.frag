uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	vec3 col = vec3(0.038, 0.014, 0.040);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 0.86 - float(ci) * 0.09;
		vec2 cp = cos(ft * 3.0) * 0.83 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.79)) * (0.0108 / (length(p - cp) + 0.030)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
