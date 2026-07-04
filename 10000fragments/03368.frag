uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	vec3 col = vec3(0.028, 0.014, 0.048);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 1.56 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.51 + 0.12 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.61)) * (0.0064 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 1.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
