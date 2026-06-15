uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.96) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.40 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.38 + t * 1.31 + ph) + sin(p.y * 12.00 - t * 1.31 + ph)
        + sin((p.x + p.y) * 6.09 + t * 1.31 + ph) + sin(length(p) * 4.85 - t * 1.31 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.10; p = rot2(1.76) * p; }
	{ float fr = length(p); p *= 1.0 + 0.21 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.07 + time * 0.19, vec3(0.57, 0.56, 0.49), vec3(0.39, 0.33, 0.48), vec3(1.29, 0.77, 0.89), vec3(0.53, 0.56, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
