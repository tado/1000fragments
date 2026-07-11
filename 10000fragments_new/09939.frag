uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.57 + 0.23 * pow(abs(cos(ra * 4.0 + t * 1.12)), 2.09);
    v = sin((rr - pet) * 10.16 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.50;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.83)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 19.98 - t * 6.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(2.74) * q1;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.17, lr * 2.91 + time * -0.84); }
	q2.x += sin(q2.y * 2.95 + time * 1.07) * 0.22;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 2.00);
	float d = d1 * d2;
	vec3 col = vec3(0.46, 0.38, 0.37) * (0.23 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
