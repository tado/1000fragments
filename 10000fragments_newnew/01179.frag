uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.85 * sin(mf + 3.0) + ph), cos(t * 0.51 * cos(mf + 3.0) + ph));
        ms += 0.058 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.29 + t * 0.86) - 0.5) * 2.0;
    v = sin((p.y * 6.03 + zx * 0.90 + t * 2.93) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.80;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.12, lr * 2.51 + time * -0.44); }
	q1 = rot2(length(q1) * 2.39 + time * 1.39) * q1;
	q2 = abs(q2) - 0.53;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.82);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.40 + time * 0.06, vec3(0.56, 0.46, 0.51), vec3(0.38, 0.43, 0.38), vec3(1.30, 1.05, 1.11), vec3(0.94, 0.06, 0.87));
	col *= 0.85 + 0.11 * sin(gl_FragCoord.y * 2.49 + time * 10.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
