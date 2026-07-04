uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.65 + 0.20 * cos(sa * 6.0 + t * 1.79 + ph);
    v = sin((sr - petal) * 8.38);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.39 + t * 0.54 + ph) * 0.7;
    float wb = sin(p.y * 9.94 - t * 3.27 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.59;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -3.82 + time * 0.31) * q1;
	q2 = rot2(length(q2) * 1.92 + time * 0.79) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.93);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.12, 0.35), vec3(0.82, 0.57, 0.41), cc);
	col = fract(col * 1.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
