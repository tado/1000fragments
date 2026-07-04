uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	vec3 col = vec3(0.014, 0.002, 0.026);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 2.16 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.64 + 0.11 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.54)) * (0.0047 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
