uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.58;
	p *= 2.34;
	p = rot2(2.51) * p;
	vec2 q = p * 3.30 + vec2(0.03, 0.85);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 0.22) > 0.56) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 6.89);
	float ftn = 0.5 + 0.5 * sin((time * 0.79) * 1.50 + h * 6.2831853);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.65, 0.58, 0.62), vec3(0.14, 0.12, 0.14), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.431, 0.446, bd);
	col = mix(col, vec3(0.09, 0.17, 0.17), edge * 0.86);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col = clamp(col, 0.0, 1.0) * vec3(1.002, 1.018, 0.995) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
