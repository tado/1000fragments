uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.33 + t * 0.83) - 0.5) * 2.0;
    v = sin((p.y * 5.59 + zx * 1.75 + t * 2.43) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.30;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 9.74 - t * 4.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 1.02;
	q1 = rot2(q1.y * -3.41 + time * 0.93) * q1;
	q2 += vec2(0.99, -0.52) * sin(length(q2) * 3.96 - time * 1.81) * 0.13;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.19);
	float d = max(d1, d2);
	vec3 col = vec3(0.88, 0.22, 0.79) * (0.11 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.04 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
