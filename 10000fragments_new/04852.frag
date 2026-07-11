uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.50 + 0.31 * pow(abs(cos(ra * 3.0 + t * 2.39)), 0.83);
    v = sin((rr - pet) * 16.74 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.31;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.53; kp = rot2(2.64) * kp; kp *= 1.34; }
    v = sin(kp.y * 3.71 - t * 2.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.64;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.78);
	float d = d1 * d2;
	vec3 col = palette(d * 0.97 + time * 0.20, vec3(0.43, 0.56, 0.44), vec3(0.36, 0.40, 0.35), vec3(0.70, 0.99, 1.10), vec3(0.60, 0.28, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
