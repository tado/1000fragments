uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.28 * pow(abs(cos(ra * 6.0 + t * 0.84)), 2.70);
    v = sin((rr - pet) * 14.22 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.48, t * 1.41)) - 0.5) * 1.15;
    v = exp(-abs(bx) * 7.28) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(length(q2) * -2.71 + time * 0.94) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.47);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.57));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.82 + time * 0.79);
	col = fract(col * 2.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
