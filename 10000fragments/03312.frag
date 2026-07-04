uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	vec3 col = vec3(0.010, 0.024, 0.046);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 2.13 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.53 + 0.28 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.73)) * (0.0062 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
