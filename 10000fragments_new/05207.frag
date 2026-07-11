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
    vec2 wq = vec2(vnoise2(p * 2.53 + ph), vnoise2(p * 2.53 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.53 + 1.75 * wq + vec2(1.7, 9.2) + t * 1.02),
                   vnoise2(p * 2.53 + 1.88 * wq + vec2(8.3, 2.8) - t * 0.86));
    v = vnoise2(p * 2.53 + 3.82 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.94 + 0.20 * sin(t * 1.44)) + vec2(-0.72, -0.24) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 21; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 21.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	vec2 q1 = p; vec2 q2 = p;
	q2 += vec2(-0.11, -0.78) * sin(length(q2) * 3.30 - time * 1.16) * 0.30;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.89, lr * 2.77 + time * 0.70); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.97);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.97 + time * 0.29, vec3(0.40, 0.56, 0.54), vec3(0.49, 0.33, 0.38), vec3(1.01, 0.77, 1.07), vec3(0.01, 0.73, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
