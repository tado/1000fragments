uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.88 + sr * 14.98 - t * 4.03 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.27 + t * 1.18 + ph) * 0.7;
    float wb = sin(p.y * 10.41 - t * 3.09 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.73;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.69);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.49 + time * 0.31, vec3(0.51, 0.41, 0.42), vec3(0.37, 0.46, 0.34), vec3(1.03, 1.12, 1.34), vec3(0.87, 0.34, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
