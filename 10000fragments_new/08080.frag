uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.97 + sin(p.y * 2.56 + t * 4.50) * 2.47 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.25 * cos(sa * 6.0 + t * 0.57 + ph);
    v = sin((sr - petal) * 17.90);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.44; q2 = rot2(2.52) * q2; }
	q2.x += sin(q2.y * 2.95 + time * 1.97) * 0.14;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.08);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.90 + time * 0.99);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
