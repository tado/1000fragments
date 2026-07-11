uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 2.07;
	vec2 q = p * 2.02 + vec2(4.35, 7.10);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 0.91) > 0.61) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 2.58);
	float ftn = 0.5 + 0.5 * sin((time * 0.84) * 2.41 + h * 6.2831853);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.77 + (time * 0.84) * 0.06, vec3(0.32, 0.26, 0.27), vec3(0.31, 0.31, 0.31), vec3(0.86, 0.57, 0.72), vec3(0.52, 0.42, 0.33));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.444, 0.459, bd);
	col = mix(col, vec3(0.76, 0.80, 0.67), edge * 0.74);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.68 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.978, 0.995) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
