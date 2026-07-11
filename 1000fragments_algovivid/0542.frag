uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.39 + (time * 0.81) * 0.44) * 0.07;
	vec2 q = p * 2.05 + vec2(0.10, 4.51);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 3.85) > 0.70) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 6.56);
	float ftn = clamp(0.5 + gv.x * 1.42 + gv.y * -1.22, 0.0, 1.0) * (0.35 + 0.65 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.01, 0.07), vec3(0.67, 0.63, 0.55), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.412, 0.427, bd);
	col = mix(col, vec3(0.73, 0.82, 0.70), edge * 0.85);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(1.047, 0.971, 0.946) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
