uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.037, 0.021, 0.002);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 2.05 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 3.0 + 0.23), sin(ft * 2.0)) * 0.59;
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.71)) * (0.0116 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
