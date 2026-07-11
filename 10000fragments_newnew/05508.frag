uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	vec3 col = vec3(0.005, 0.002, 0.052);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 0.64 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 4.0 + 0.21), sin(ft * 3.0)) * 0.84;
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.88)) * (0.0114 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
