uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.032, 0.009, 0.031);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 1.08 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 5.0 + 2.46), sin(ft * 5.0)) * 0.64;
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.29)) * (0.0066 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
