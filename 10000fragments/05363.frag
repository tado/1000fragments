uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 1.27, t * 2.79)) - 0.5) * 0.99;
    v = exp(-abs(bx) * 7.65) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.18 * pow(abs(cos(ra * 5.0 + t * 0.63)), 1.72);
    v = sin((rr - pet) * 11.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.63;
	vec2 q1 = p; vec2 q2 = p;
	q2 = sin(q2 * 1.78 + time * 1.06) * 1.30;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.76);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.22, 0.92, 0.56) * (0.22 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
