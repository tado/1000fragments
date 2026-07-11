uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.85;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.84)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 23.34 - t * 2.42 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.52 + vec2(t * 1.11, -t * 0.52) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.50;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.66; kp = rot2(1.46) * kp; kp *= 1.38; }
    v = sin(kp.y * 2.79 - t * 1.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * -1.29 + time * 0.80) * q1;
	q1 *= 1.55;
	q2 = (floor(q2 * 25.2) + 0.5) / 25.2;
	q3 = rot2(q3.y * -2.40 + time * 0.58) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.55);
	float d3 = fieldC(q3, time, 0.53);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = hue(d * 0.88 + time * 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
