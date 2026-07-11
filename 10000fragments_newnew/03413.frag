uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	vec3 col = vec3(0.021, 0.035, 0.046);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 1.47 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 2.0 + 0.30), sin(ft * 3.0)) * 0.86;
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.63)) * (0.0059 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
