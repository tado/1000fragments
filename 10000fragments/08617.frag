uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec3 col = vec3(0.038, 0.034, 0.000);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 0.97 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.48 + 0.15 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.79)) * (0.0119 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
