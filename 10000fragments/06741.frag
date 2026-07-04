uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.17 + t * 2.20 + ph) + sin(p.y * 16.66 - t * 3.90 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.10 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.68 + t * 3.30 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.61 - t * 4.68 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * -1.48) * q1;
	q1 = abs(q1);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.69);
	float d3 = fieldC(q3, time, 1.26);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = vec3(0.80, 0.17, 0.95) * (0.09 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
