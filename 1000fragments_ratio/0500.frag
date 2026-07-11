uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.30;
	vec2 q = p * 1.67 + vec2(4.94, 0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 8.70) > 0.59) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 2.05);
	float ftn = 0.5 + 0.5 * sin((time * 0.61) * 1.31 + h * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.47, 0.58, 0.41) + vec3(0.07, 0.12, 0.09);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.412, 0.427, bd);
	col = mix(col, vec3(0.03, 0.06, 0.03), edge * 0.76);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.61)) * 100.0) - 0.5) * 0.10;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col = clamp(col, 0.0, 1.0) * vec3(1.059, 0.995, 0.920) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
