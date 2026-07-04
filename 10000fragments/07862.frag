uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.032, 0.006, 0.012);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 0.65 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 3.0 + 2.87), sin(ft * 4.0)) * 0.71;
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.50)) * (0.0090 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
