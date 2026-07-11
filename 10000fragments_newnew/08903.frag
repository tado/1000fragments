uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	vec3 col = vec3(0.036, 0.030, 0.043);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 1.02 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 4.0 + 1.38), sin(ft * 4.0)) * 0.63;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.55)) * (0.0054 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
