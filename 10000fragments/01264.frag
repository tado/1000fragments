uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.52 + t * 3.83 + ph) + sin(p.y * 7.27 - t * 3.83 + ph)
        + sin((p.x + p.y) * 9.21 + t * 3.83 + ph) + sin(length(p) * 3.94 - t * 3.83 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.11 + t * 1.81 + ph) + sin(p.y * 15.86 - t * 5.25 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.34; p = rot2(0.35) * p; }
	p += vec2(-0.63, 0.41) * sin(length(p) * 5.71 - time * 1.87) * 0.38;
	{ float fr = length(p); p *= 1.0 + -0.28 * fr * fr; }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.19);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.39 + time * 0.07, vec3(0.58, 0.46, 0.46), vec3(0.48, 0.38, 0.36), vec3(1.24, 0.95, 1.16), vec3(0.07, 0.64, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
