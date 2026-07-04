uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	vec3 col = vec3(0.025, 0.009, 0.005);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 1.78 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.41 + 0.30 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.78)) * (0.0109 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
