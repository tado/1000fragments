uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.91 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.81 + t * 1.06 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.35 + jf * 4.0), cos(t * 0.38 * jf)) * 0.90;
        xs += sin(length(p - im) * 92.76 - t * 4.95 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 6.43 + time * 2.65) * 0.38;
	{ float fr = length(q1); q1 *= 1.0 + 0.37 * fr * fr; }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.20, length(q2) * 2.31 - time * 0.23); }
	q2 = rot2(q2.y * 2.56 + time * 0.72) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.09);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.65 + time * 0.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
