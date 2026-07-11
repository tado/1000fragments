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
    vec2 mc = p * (2.00 + 0.41 * sin(t * 0.44)) + vec2(-0.33, 0.12) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 17; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 17.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.17 + ph), vnoise2(p * 2.17 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.17 + 3.85 * wq + vec2(1.7, 9.2) + t * 0.52),
                   vnoise2(p * 2.17 + 1.97 * wq + vec2(8.3, 2.8) - t * 1.09));
    v = vnoise2(p * 2.17 + 2.00 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.79;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q2); q2 *= 1.0 + -0.63 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.43);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.31));
	vec3 col = palette(d * 0.48 + time * 0.20, vec3(0.58, 0.51, 0.45), vec3(0.46, 0.48, 0.47), vec3(1.39, 0.92, 1.23), vec3(0.70, 0.40, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
