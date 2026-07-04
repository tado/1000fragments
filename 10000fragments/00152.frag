uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	vec3 col = vec3(0.028, 0.026, 0.036);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 1.40 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.66 + 0.17 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.49)) * (0.0094 / (length(p - cp) + 0.030)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 1.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
