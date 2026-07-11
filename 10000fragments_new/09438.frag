uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.94 + t * 3.68 + ph) + sin(p.y * 5.16 - t * 3.68 + ph)
        + sin((p.x + p.y) * 10.05 + t * 3.68 + ph) + sin(length(p) * 12.65 - t * 3.68 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.16;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.70)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 19.97 - t * 7.06 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * -1.21 + time * 0.82) * q2;
	q2 = rot2(2.68) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.12);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.38 + time * 0.61);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
