uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 3.54;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 17.55 - t * 2.36 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.42 + 0.15 * sin(t * 0.91)) + vec2(-0.60, -0.05) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 28; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 28.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.39, lr * 1.24 + time * -0.87); }
	q2 *= 1.56;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.90);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.29 + time * 0.26, vec3(0.51, 0.47, 0.51), vec3(0.45, 0.48, 0.50), vec3(0.75, 1.34, 0.81), vec3(0.61, 0.68, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
