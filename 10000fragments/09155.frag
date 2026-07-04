uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	vec3 col = vec3(0.017, 0.011, 0.012);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 1.45 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.60 + 0.23 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.20)) * (0.0057 / (length(p - cp) + 0.010)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
