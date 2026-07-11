uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	vec3 col = vec3(0.021, 0.024, 0.023);
	for(int ci = 0; ci < 20; ci++){
		float ft = time * 2.02 - float(ci) * 0.06;
		vec2 cp = cos(ft * 4.0) * 0.66 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.82)) * (0.0096 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
