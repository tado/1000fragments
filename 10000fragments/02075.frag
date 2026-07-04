uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.040, 0.001, 0.002);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 1.68 - float(ci) * 0.04;
		vec2 cp = vec2(sin(ft * 3.0 + 1.43), sin(ft * 3.0)) * 0.60;
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.47)) * (0.0085 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
