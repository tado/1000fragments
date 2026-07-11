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
    vec2 wq = vec2(vnoise2(p * 2.88 + ph), vnoise2(p * 2.88 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.88 + 2.05 * wq + vec2(1.7, 9.2) + t * 1.15),
                   vnoise2(p * 2.88 + 2.58 * wq + vec2(8.3, 2.8) - t * 1.14));
    v = vnoise2(p * 2.88 + 3.03 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 5.04 * sin(t * 0.55) + t * 2.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	q1 *= 2.76;
	q2 = rot2(q2.y * -2.99 + time * 0.39) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.91);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.47));
	vec3 col = vec3(0.77, 0.48, 0.84) * (0.07 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
