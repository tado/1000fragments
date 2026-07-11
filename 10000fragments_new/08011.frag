uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.26 * cos(sa * 8.0 + t * 1.30 + ph);
    v = sin((sr - petal) * 13.12);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.41;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.75; kp = rot2(2.61) * kp; kp *= 1.35; }
    v = sin(kp.y * 2.23 - t * 2.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -1.15 + time * 1.49) * p;
	p += vec2(0.25, -0.09) * sin(length(p) * 4.84 - time * 1.39) * 0.21;
	p = (floor(p * 17.0) + 0.5) / 17.0;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.35 + time * 0.14, vec3(0.53, 0.60, 0.54), vec3(0.34, 0.31, 0.47), vec3(0.83, 0.87, 0.84), vec3(0.56, 0.71, 0.28));
	col = fract(col * 1.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
