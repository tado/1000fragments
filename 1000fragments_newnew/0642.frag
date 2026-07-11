uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.20 + vec2(t * 1.19, -t * 1.82) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.01;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.71)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 14.51 - t * 4.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, (time * 0.70), 0.0);
	float d2 = fieldB(q2, (time * 0.70), 1.56);
	float d = min(d1, d2);
	vec3 col = palette((d) * 0.97 + (time * 0.70) * 0.00, vec3(0.41, 0.37, 0.33), vec3(0.15, 0.20, 0.13), vec3(0.74, 0.70, 0.45), vec3(0.82, 0.62, 0.62));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.58));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.912, 0.968, 1.043) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
