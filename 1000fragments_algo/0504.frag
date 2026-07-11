uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.93;
	p = rot2(1.51) * p;
	vec2 q = p * 2.15 + vec2(7.38, 1.39);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 4.97) > 0.48) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 3.56);
	float ftn = 0.5 + 0.5 * sin((time * 0.78) * 1.42 + h * 6.2831853);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.88 + (time * 0.78) * 0.17, vec3(0.44, 0.51, 0.54), vec3(0.24, 0.22, 0.24), vec3(0.60, 0.64, 0.62), vec3(0.18, 0.18, 0.11));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.435, 0.450, bd);
	col = mix(col, vec3(0.62, 0.74, 0.66), edge * 0.96);
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.947, 0.986, 1.024) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
