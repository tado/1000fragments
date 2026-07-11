uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 28.04 - t * 3.20 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 33.50 - t * 5.60 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.45 + 0.28 * pow(abs(cos(ra * 5.0 + t * 1.56)), 2.53);
    v = sin((rr - pet) * 9.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 5.22 + time * 2.95) * 0.10;
	q2 = rot2(0.53) * q2;
	{ float fr = length(q2); q2 *= 1.0 + 0.33 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.69);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.22 + time * 0.54);
	col = mod(col * 2.18, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
