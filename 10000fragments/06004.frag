uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.019, 0.017, 0.019);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 1.07 - float(ci) * 0.06;
		vec2 cp = cos(ft * 5.0) * 0.81 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.69)) * (0.0118 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
