uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.52 + 0.26 * pow(abs(cos(ra * 3.0 + t * 0.68)), 2.75);
    v = sin((rr - pet) * 19.53 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.45;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 14.08 - t * 2.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.16;
	vec2 q1 = p; vec2 q2 = p;
	q2 = abs(q2);
	q2 += vec2(-0.88, 0.19) * sin(length(q2) * 3.45 - time * 1.32) * 0.19;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.50);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.48 + time * 0.07, vec3(0.59, 0.58, 0.45), vec3(0.46, 0.41, 0.42), vec3(0.95, 1.31, 1.40), vec3(0.04, 0.56, 0.17));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
