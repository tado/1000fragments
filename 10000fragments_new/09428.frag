uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.29 + ph), vnoise2(p * 2.29 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.29 + 3.62 * wq + vec2(1.7, 9.2) + t * 0.89),
                   vnoise2(p * 2.29 + 1.21 * wq + vec2(8.3, 2.8) - t * 0.96));
    v = vnoise2(p * 2.29 + 3.90 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.49;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.96)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 29.67 - t * 5.73 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.50);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.95 + time * 0.15, vec3(0.60, 0.50, 0.48), vec3(0.32, 0.37, 0.34), vec3(0.95, 1.18, 1.20), vec3(0.26, 0.18, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
