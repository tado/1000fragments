uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.16 - t * 3.91 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.25;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 17.94 - t * 5.38 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 2.82) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.57);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.26 + time * 0.32, vec3(0.40, 0.45, 0.55), vec3(0.44, 0.32, 0.47), vec3(1.02, 0.78, 0.98), vec3(0.46, 0.06, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
