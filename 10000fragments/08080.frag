uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.022, 0.032, 0.019);
	for(int ci = 0; ci < 20; ci++){
		float ft = time * 1.08 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 2.0 + 0.33), sin(ft * 4.0)) * 0.83;
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.00)) * (0.0103 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
