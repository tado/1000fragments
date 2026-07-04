uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	vec3 col = vec3(0.002, 0.002, 0.032);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.06 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 3.0 + 1.02), sin(ft * 2.0)) * 0.83;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.74)) * (0.0118 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
