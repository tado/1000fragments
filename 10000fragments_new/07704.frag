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
    vec2 wq = vec2(vnoise2(p * 4.02 + ph), vnoise2(p * 4.02 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.02 + 2.47 * wq + vec2(1.7, 9.2) + t * 0.65),
                   vnoise2(p * 4.02 + 1.82 * wq + vec2(8.3, 2.8) - t * 1.12));
    v = vnoise2(p * 4.02 + 3.01 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.01, vec3(0.47, 0.45, 0.52), vec3(0.42, 0.32, 0.37), vec3(1.29, 1.29, 0.89), vec3(0.87, 0.86, 0.23));
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
