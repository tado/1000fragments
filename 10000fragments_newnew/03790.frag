uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec3 col = vec3(0.020, 0.019, 0.023);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.15 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 3.0 + 2.91), sin(ft * 2.0)) * 0.80;
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.53)) * (0.0061 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
