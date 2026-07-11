uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.019, 0.003, 0.017);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 1.34 - float(ci) * 0.04;
		vec2 cp = vec2(sin(ft * 1.0 + 2.63), sin(ft * 2.0)) * 0.53;
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.76)) * (0.0040 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
