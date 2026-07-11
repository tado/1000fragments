uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.80;
	vec3 col = vec3(0.0);
	vec2 q = p;
	for(int si = 0; si < 16; si++){
		q += 0.05 * vec2(sin(q.y * 1.68 + (time * 0.51) * 0.86), cos(q.x * 2.56 - (time * 0.51) * 2.01));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.74, 1.47) + float(si) * 0.37 + (time * 0.51) * 0.23)) * (0.0063 / (abs(sin(q.x * 3.95) + sin(q.y * 3.57)) + 0.06));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.51)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(1.051, 0.974, 0.930) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
