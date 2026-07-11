uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.11 + jf * 4.0), cos(t * 0.45 * jf)) * 0.49;
        xs += sin(length(p - im) * 134.47 - t * 6.46 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.46 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.25 + t * 3.93 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(1.04) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.83);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.80 + time * 0.15, vec3(0.53, 0.47, 0.47), vec3(0.40, 0.34, 0.49), vec3(1.19, 1.17, 1.35), vec3(0.33, 0.57, 0.22));
	col *= 0.87 + 0.11 * sin(gl_FragCoord.y * 1.13 + time * 11.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
