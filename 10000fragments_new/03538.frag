uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 36.03 - t * 1.75 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 16.76 - t * 1.01 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.03;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.52; kp = rot2(2.32) * kp; kp *= 1.21; }
    v = sin(kp.y * 3.20 - t * 4.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.36;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.81);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.74 + time * 0.07, vec3(0.51, 0.50, 0.41), vec3(0.41, 0.34, 0.34), vec3(0.80, 0.86, 0.90), vec3(0.66, 0.62, 0.34));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
