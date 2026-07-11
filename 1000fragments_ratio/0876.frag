uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	vec3 col = vec3(0.039, 0.008, 0.021);
	for(int ci = 0; ci < 30; ci++){
		float ft = (time * 0.51) * 0.93 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.57 + 0.20 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.55, 3.10) + ft * 1.52)) * (0.0083 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.51)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col = clamp(col, 0.0, 1.0) * vec3(0.940, 0.986, 1.040) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
