uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	vec3 col = vec3(0.019, 0.035, 0.015);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 1.81 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.50 + 0.30 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.79)) * (0.0101 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
