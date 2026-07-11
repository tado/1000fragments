uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.31;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 1.93 + vec2(5.69, 7.89);
	q += (time * 0.68) * vec2(0.09, 0.08);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 7.49) > 0.65) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 0.07);
	float ftn = 0.5 + 0.5 * sin((time * 0.68) * 0.86 + h * 6.2831853);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.81 + (time * 0.68) * 0.19, vec3(0.39, 0.37, 0.49), vec3(0.20, 0.26, 0.19), vec3(0.71, 0.45, 0.62), vec3(0.86, 0.50, 0.11));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.414, 0.429, bd);
	col = mix(col, vec3(0.81, 0.72, 0.84), edge * 0.85);
	col = clamp((col - 0.5) * 2.02 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.975, 1.016, 0.955) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
