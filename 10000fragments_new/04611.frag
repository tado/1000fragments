uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.55 + 0.27 * pow(abs(cos(ra * 5.0 + t * 2.62)), 0.96);
    v = sin((rr - pet) * 21.16 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.19 * pow(abs(cos(ra * 5.0 + t * 2.21)), 1.67);
    v = sin((rr - pet) * 16.99 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 23.29 - t * 7.03 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 30.16 - t * 6.60 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.19;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.y += sin(q1.x * 6.08 + time * 1.47) * 0.20;
	q1 = rot2(q1.y * 2.61 + time * 0.21) * q1;
	q2 = rot2(2.19) * q2;
	q3 = fract(q3 * 2.34) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.44);
	float d3 = fieldC(q3, time, 0.26);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.76 + time * 0.35);
	col = mod(col * 2.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
