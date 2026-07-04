uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.007, 0.038, 0.048);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.66 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.56 + 0.19 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.89)) * (0.0077 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
