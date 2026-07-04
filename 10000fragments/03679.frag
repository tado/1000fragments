uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	vec3 col = vec3(0.038, 0.028, 0.041);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 1.48 - float(ci) * 0.08;
		vec2 cp = cos(ft * 3.0) * 0.61 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.94)) * (0.0117 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.14 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
