uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.037, 0.000, 0.014);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 0.72 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 5.0 + 1.67), sin(ft * 3.0)) * 0.87;
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.64)) * (0.0043 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
