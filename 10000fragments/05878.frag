uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.88 + t * 1.93 + ph) + sin(p.y * 11.38 - t * 1.93 + ph)
        + sin((p.x + p.y) * 10.64 + t * 1.93 + ph) + sin(length(p) * 17.38 - t * 1.93 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.20 * cos(sa * 3.0 + t * 2.26 + ph);
    v = sin((sr - petal) * 6.20);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.32;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.10)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.54 - t * 6.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = abs(q1);
	q1 = sin(q1 * 1.98 + time * 1.23) * 0.73;
	q2 = rot2(length(q2) * -1.56 + time * 0.37) * q2;
	q2 = rot2(time * -0.65) * q2;
	q3 *= 1.0 + 0.32 * sin(time * 2.22);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.09);
	float d3 = fieldC(q3, time, 0.02);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.92 + time * 0.73);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
