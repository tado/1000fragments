uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	vec3 col = vec3(0.027, 0.038, 0.020);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 0.84 - float(ci) * 0.11;
		vec2 cp = cos(ft * 2.0) * 0.55 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.66)) * (0.0041 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.84 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
