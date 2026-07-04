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
    float bx = p.x + (vnoise2(vec2(p.y * 3.56, t * 0.71)) - 0.5) * 0.84;
    v = exp(-abs(bx) * 8.73) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.77 + ph), vnoise2(p * 3.77 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.77 + 3.38 * wq + vec2(1.7, 9.2) + t * 1.19),
                   vnoise2(p * 3.77 + 3.51 * wq + vec2(8.3, 2.8) - t * 0.93));
    v = vnoise2(p * 3.77 + 1.65 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.39; q1 = rot2(1.50) * q1; }
	q1 *= 1.45;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.11);
	float d = d1 * d2;
	vec3 col = vec3(0.38, 0.58, 0.27) * (0.20 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = mod(col * 2.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
