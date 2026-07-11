uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.83 + t * 4.43 + ph) + sin(p.y * 8.46 - t * 4.52 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.50 + t * 4.44 + ph) + sin(p.y * 8.48 - t * 4.44 + ph)
        + sin((p.x + p.y) * 10.21 + t * 4.44 + ph) + sin(length(p) * 5.92 - t * 4.44 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.52; p = rot2(2.17) * p; }
	p = rot2(1.19) * p;
	{ float fr = length(p); p *= 1.0 + -0.35 * fr * fr; }
	p = rot2(time * -0.21) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.60);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.16 + time * 0.23, vec3(0.49, 0.46, 0.52), vec3(0.44, 0.40, 0.38), vec3(1.22, 1.07, 1.34), vec3(0.40, 0.27, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
