uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	vec3 col = vec3(0.023, 0.020, 0.038);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 2.08 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.49 + 0.21 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.37)) * (0.0100 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
