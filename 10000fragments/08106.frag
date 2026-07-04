uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.64;
    v = 0.5 * (sin(6.0 * cp.x + t * 0.53) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 0.70) * sin(6.0 * cp.y + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 4.17 * sin(t * 0.69) + t * 4.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.0 + 0.13 * sin(time * 1.95);
	p = rot2(p.y * 3.64 + time * 0.31) * p;
	p += vec2(-0.01, 0.20) * sin(length(p) * 4.95 - time * 1.06) * 0.30;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.61);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.02, vec3(0.58, 0.42, 0.49), vec3(0.47, 0.47, 0.43), vec3(1.39, 0.86, 1.11), vec3(0.45, 0.70, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
