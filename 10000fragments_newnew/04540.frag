uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.016, 0.010, 0.047);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 1.32 - float(ci) * 0.12;
		vec2 cp = vec2(sin(ft * 3.0 + 1.69), sin(ft * 2.0)) * 0.88;
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.04)) * (0.0041 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
