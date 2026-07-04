uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.009, 0.034, 0.053);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 0.99 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 5.0 + 1.87), sin(ft * 3.0)) * 0.63;
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.60)) * (0.0100 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
