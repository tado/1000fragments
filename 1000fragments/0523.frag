uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	vec3 col = vec3(0.007, 0.037, 0.042);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 1.31 - float(ci) * 0.07;
		vec2 cp = cos(ft * 6.0) * 0.53 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.90)) * (0.0065 / (length(p - cp) + 0.017)) * fade;
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
