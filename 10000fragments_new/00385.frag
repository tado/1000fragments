uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.19 * pow(abs(cos(ra * 2.0 + t * 2.07)), 1.08);
    v = sin((rr - pet) * 15.93 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.28 * pow(abs(cos(ra * 4.0 + t * 2.67)), 1.00);
    v = sin((rr - pet) * 10.76 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(1.98) * q1;
	q1.x += sin(q1.y * 7.90 + time * 1.20) * 0.38;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.34);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.98));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.51 + time * 0.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
