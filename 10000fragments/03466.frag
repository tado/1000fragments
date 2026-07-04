uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	vec3 col = vec3(0.030, 0.025, 0.017);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.64 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 2.0 + 0.91), sin(ft * 4.0)) * 0.89;
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.62)) * (0.0077 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
