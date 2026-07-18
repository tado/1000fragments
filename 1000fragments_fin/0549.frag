uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q = p * 2.44 + vec2(6.03, 0.38);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 8.57) > 0.47) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 0.90);
	float rr = 0.29 + 0.05 * sin((time * 0.85) * 0.77 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.081, 0.043, 0.044), vec3(0.693, 0.320, 0.162), smoothstep(0.0, 0.44, cc)), vec3(1.000, 0.851, 0.616), smoothstep(0.44, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.433, 0.448, bd);
	col = mix(col, vec3(0.08, 0.02, 0.01), edge * 0.99);
	col = clamp((col - 0.5) * 1.98 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.04);
	col *= vec3(0.990, 1.015, 0.956);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
