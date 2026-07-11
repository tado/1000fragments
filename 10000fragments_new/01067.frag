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

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.57 + t * 3.96 + ph) + sin(p.y * 2.78 - t * 2.23 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.88 + ph), vnoise2(p * 3.88 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.88 + 3.35 * wq + vec2(1.7, 9.2) + t * 0.98),
                   vnoise2(p * 3.88 + 3.28 * wq + vec2(8.3, 2.8) - t * 0.40));
    v = vnoise2(p * 3.88 + 2.53 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.90;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.55);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.71 + time * 0.27, vec3(0.56, 0.58, 0.48), vec3(0.48, 0.48, 0.45), vec3(0.86, 0.78, 1.26), vec3(0.82, 0.93, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
