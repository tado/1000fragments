uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	vec3 col = vec3(0.002, 0.037, 0.006);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 0.62 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 1.0 + 0.78), sin(ft * 2.0)) * 0.60;
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.45)) * (0.0047 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
