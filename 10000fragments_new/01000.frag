uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.40;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.64; kp = rot2(1.65) * kp; kp *= 1.43; }
    v = sin(kp.x * 2.52 - t * 3.01 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.77;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 11.24 - t * 3.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.31; p = rot2(1.69) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.06);
	float d = d1 + d2;
	vec3 col = palette(d * 1.44 + time * 0.10, vec3(0.50, 0.52, 0.54), vec3(0.48, 0.48, 0.44), vec3(1.13, 1.11, 1.15), vec3(0.58, 0.01, 0.87));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
