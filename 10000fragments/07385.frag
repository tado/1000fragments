uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.033, 0.033, 0.049);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 0.77 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.47 + 0.22 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.48)) * (0.0053 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
