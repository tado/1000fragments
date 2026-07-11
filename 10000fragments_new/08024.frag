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
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.58 + jf * 4.0), cos(t * 0.27 * jf)) * 0.50;
        xs += sin(length(p - im) * 210.04 - t * 7.69 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.37 + ph), vnoise2(p * 2.37 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.37 + 1.67 * wq + vec2(1.7, 9.2) + t * 0.59),
                   vnoise2(p * 2.37 + 2.99 * wq + vec2(8.3, 2.8) - t * 0.85));
    v = vnoise2(p * 2.37 + 2.66 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = (floor(p * 24.0) + 0.5) / 24.0;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.71 + time * 0.01, vec3(0.58, 0.43, 0.56), vec3(0.46, 0.47, 0.39), vec3(0.98, 0.72, 1.19), vec3(0.95, 0.91, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
