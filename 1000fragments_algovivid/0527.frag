uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.35) * p;
	vec2 q = p * 2.39 + vec2(6.94, 1.26);
	q += (time * 0.54) * vec2(-0.09, -0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 6.97) > 0.48) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 8.16);
	float rr = 0.26 + 0.06 * sin((time * 0.54) * 0.70 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.66 + (time * 0.54) * 0.06, vec3(0.30, 0.42, 0.38), vec3(0.28, 0.22, 0.22), vec3(0.53, 0.52, 0.90), vec3(0.70, 0.03, 0.30));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.413, 0.428, bd);
	col = mix(col, vec3(0.75, 0.72, 0.60), edge * 0.87);
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 2.70 + (time * 0.54) * 12.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(0.972, 1.021, 0.948) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
