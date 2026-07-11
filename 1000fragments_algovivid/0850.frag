uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.51) * 0.66), cos((time * 0.51) * 0.67)) * 0.20;
	p *= 1.48;
	vec3 col = vec3(0.011, 0.007, 0.021);
	for(int ci = 0; ci < 21; ci++){
		float ft = (time * 0.51) * 2.20 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.45 + 0.10 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.31, 2.62) + ft * 1.74)) * (0.0081 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.51)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.34);
	col = clamp(col, 0.0, 1.0) * vec3(1.037, 0.999, 0.929) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
