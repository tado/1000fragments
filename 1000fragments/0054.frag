uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 2.33, t * 1.65)) - 0.5) * 0.86;
    v = exp(-abs(bx) * 11.87) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.81;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 11.23 - t * 1.09 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.03;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 22.1) + 0.5) / 22.1;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.73;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.30 + time * 0.09, vec3(0.56, 0.42, 0.42), vec3(0.42, 0.37, 0.47), vec3(0.94, 0.86, 0.74), vec3(0.35, 0.00, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
