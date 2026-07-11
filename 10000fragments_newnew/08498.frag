uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.002, 0.008, 0.051);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.82 - float(ci) * 0.12;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.64 + 0.22 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.92)) * (0.0110 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
