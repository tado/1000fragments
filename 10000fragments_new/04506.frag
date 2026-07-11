uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.75 + t * 1.59 + ph) + sin(p.y * 5.84 - t * 1.59 + ph)
        + sin((p.x + p.y) * 2.72 + t * 1.59 + ph) + sin(length(p) * 14.66 - t * 1.59 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.20 * pow(abs(cos(ra * 4.0 + t * 2.05)), 2.09);
    v = sin((rr - pet) * 21.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.31; q1 = rot2(1.34) * q1; }
	q1 = rot2(1.33) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.07);
	float d = d1 * d2;
	vec3 col = vec3(0.97, 0.68, 0.58) * (0.19 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
