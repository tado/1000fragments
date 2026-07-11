uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.23;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.52; kp = rot2(1.02) * kp; kp *= 1.25; }
    v = sin(kp.x * 1.93 - t * 1.19 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.58;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.42; kp = rot2(1.77) * kp; kp *= 1.22; }
    v = sin(kp.x * 1.19 - t * 3.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 7.86 + time * 1.85) * 0.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.74);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.96 + time * 0.08, vec3(0.59, 0.55, 0.41), vec3(0.36, 0.37, 0.32), vec3(1.33, 0.95, 1.18), vec3(0.97, 0.08, 0.92));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
