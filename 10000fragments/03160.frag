uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.61) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 0.68 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.13;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.53)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 18.72 - t * 7.11 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 37.65 - t * 4.69 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 16.86 - t * 4.80 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(0.36, -0.26) * sin(length(q1) * 3.89 - time * 0.85) * 0.19;
	q1 = rot2(length(q1) * 1.82 + time * 0.55) * q1;
	q2 = fract(q2 * 2.23) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.00);
	float d3 = fieldC(q3, time, 0.02);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = palette(d * 0.80 + time * 0.35, vec3(0.57, 0.57, 0.59), vec3(0.32, 0.46, 0.45), vec3(1.14, 1.03, 1.33), vec3(0.01, 0.16, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
