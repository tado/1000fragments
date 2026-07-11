uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec3 col = vec3(0.022, 0.037, 0.031);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 0.95 - float(ci) * 0.08;
		vec2 cp = cos(ft * 6.0) * 0.62 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.79)) * (0.0048 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 1.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
