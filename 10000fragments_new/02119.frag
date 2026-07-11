uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.71 - t * 7.44 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.35 * pow(abs(cos(ra * 2.0 + t * 2.47)), 0.53);
    v = sin((rr - pet) * 21.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 8.8) + 0.5) / 8.8;
	q1 = fract(q1 * 2.61) - 0.5;
	q2 = abs(q2);
	q2 = rot2(2.50) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.08);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.58));
	vec3 col = hue(d * 0.77 + time * 0.40);
	col = mod(col * 2.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
