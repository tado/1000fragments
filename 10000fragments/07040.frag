uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.48;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 20.57 - t * 2.77 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.49 + ga * 4.0 - t * 2.26 + ph);
    v = arm * exp(-gr * 1.40);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.90;
	vec2 q1 = p; vec2 q2 = p;
	q2 = sin(q2 * 2.08 + time * 1.64) * 0.89;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.12);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.46));
	vec3 col = palette(d * 1.48 + time * 0.10, vec3(0.53, 0.49, 0.54), vec3(0.41, 0.41, 0.38), vec3(0.79, 1.17, 1.07), vec3(0.53, 0.46, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
