uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.00 + t * 2.43 + ph) + sin(p.y * 7.73 - t * 2.43 + ph)
        + sin((p.x + p.y) * 6.11 + t * 2.43 + ph) + sin(length(p) * 6.13 - t * 2.43 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.65 + sin(p.y * 4.25 + t * 1.80) * 1.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.25;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.37; p = rot2(1.97) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.42);
	float d = d1 + d2;
	vec3 col = palette(d * 1.10 + time * 0.14, vec3(0.53, 0.55, 0.47), vec3(0.39, 0.44, 0.48), vec3(1.02, 1.25, 1.03), vec3(0.55, 0.54, 0.87));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
