uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	vec3 col = vec3(0.027, 0.017, 0.036);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 1.75 - float(ci) * 0.06;
		vec2 cp = vec2(sin(ft * 3.0 + 1.71), sin(ft * 1.0)) * 0.58;
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.82)) * (0.0117 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
