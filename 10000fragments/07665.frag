uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec3 col = vec3(0.032, 0.020, 0.041);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 0.74 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.45 + 0.22 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.70)) * (0.0064 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
