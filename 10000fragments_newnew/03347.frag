uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	vec3 col = vec3(0.016, 0.003, 0.019);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 1.24 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 5.0 + 2.86), sin(ft * 1.0)) * 0.66;
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.57)) * (0.0062 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
