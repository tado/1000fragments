uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	vec3 col = vec3(0.021, 0.037, 0.047);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 1.19 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.50 + 0.22 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.85)) * (0.0052 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
