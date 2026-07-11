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
    vec2 wq = vec2(vnoise2(p * 4.31 + ph), vnoise2(p * 4.31 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.31 + 2.36 * wq + vec2(1.7, 9.2) + t * 1.19),
                   vnoise2(p * 4.31 + 3.14 * wq + vec2(8.3, 2.8) - t * 0.52));
    v = vnoise2(p * 4.31 + 1.05 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.86 + jf * 4.0), cos(t * 0.59 * jf)) * 0.54;
        xs += sin(length(p - im) * 83.73 - t * 12.27 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.85);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.43 + time * 0.12, vec3(0.41, 0.45, 0.42), vec3(0.47, 0.49, 0.46), vec3(1.28, 1.13, 0.75), vec3(0.79, 0.76, 0.56));
	col = mod(col * 2.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
