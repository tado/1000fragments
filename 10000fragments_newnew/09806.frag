uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.17;
    v = 0.5 * (sin(1.0 * cp.x + t * 1.86) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 2.87) * sin(1.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.23 * cos(sa * 7.0 + t * 2.57 + ph);
    v = sin((sr - petal) * 16.15);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.39 * sin(time * 3.32);
	q2 = rot2(0.43) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.22);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.99 + time * 0.35, vec3(0.44, 0.57, 0.49), vec3(0.49, 0.50, 0.49), vec3(0.80, 1.29, 1.06), vec3(0.49, 0.94, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
