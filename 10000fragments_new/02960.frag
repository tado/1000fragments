uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.54 + 0.29 * pow(abs(cos(ra * 7.0 + t * 1.08)), 2.97);
    v = sin((rr - pet) * 20.77 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.83;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.95)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 17.11 - t * 3.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.44;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * -0.86) * q1;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.10, lr * 1.87 + time * 0.46); }
	q2 = rot2(length(q2) * -1.94 + time * 1.25) * q2;
	q2 = (floor(q2 * 28.9) + 0.5) / 28.9;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.29);
	float d = d1 * d2;
	vec3 col = vec3(0.69, 0.39, 0.59) * (0.16 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.04;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
