uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 2.04 * sin(t * 0.91) + t * 4.68 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.09 + sin(p.y * 1.65 + t * 3.28) * 1.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.83;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -1.77 + time * 1.18) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.83);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.84, 0.54, 0.99) + vec3(0.17, 0.05, 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
