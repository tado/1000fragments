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
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.86 + jf * 4.0), cos(t * 0.55 * jf)) * 0.98;
        xs += sin(length(p - im) * 160.34 - t * 4.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.85 + ph), vnoise2(p * 1.85 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.85 + 1.44 * wq + vec2(1.7, 9.2) + t * 0.87),
                   vnoise2(p * 1.85 + 1.39 * wq + vec2(8.3, 2.8) - t * 0.66));
    v = vnoise2(p * 1.85 + 2.64 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.84);
	float d = d1 * d2;
	vec3 col = palette(d * 1.40 + time * 0.16, vec3(0.55, 0.40, 0.48), vec3(0.33, 0.40, 0.38), vec3(0.87, 0.99, 0.71), vec3(0.45, 0.83, 0.09));
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
