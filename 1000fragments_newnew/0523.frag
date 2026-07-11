uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.73);
    float gsh = hash21(vec2(grow, floor(t * 5.17))) - 0.5;
    float gx = p.x + gsh * 0.53;
    v = sin(gx * 14.57 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.33));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	float d = 0.5 + 0.5 * field(p, (time * 0.69), 0.0);
	vec2 hq = rot2(0.28) * p * 9.65;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = palette(d * 0.62 + (time * 0.69) * 0.17, vec3(0.46, 0.34, 0.44), vec3(0.15, 0.20, 0.16), vec3(0.66, 0.82, 0.51), vec3(0.04, 0.27, 0.46)) * v;
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 1.17 + (time * 0.69) * 4.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.974, 1.027, 0.952) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
