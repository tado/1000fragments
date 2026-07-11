uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	vec3 col = vec3(0.020, 0.011, 0.005);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.97 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 5.0 + 1.84), sin(ft * 4.0)) * 0.87;
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.41)) * (0.0068 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.33 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
