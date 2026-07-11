uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.10;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.59; kp = rot2(1.18) * kp; kp *= 1.30; }
    v = sin(kp.x * 3.55 - t * 2.74 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -1.76 + time * 0.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.90 + time * 0.12, vec3(0.45, 0.41, 0.57), vec3(0.47, 0.35, 0.35), vec3(1.20, 1.03, 1.30), vec3(0.96, 0.54, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
