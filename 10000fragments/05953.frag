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
    v = 0.5 * (sin(p.x * 11.11 + t * 4.84 + ph) + sin(p.y * 3.06 - t * 1.75 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.50 + ph), vnoise2(p * 2.50 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.50 + 2.39 * wq + vec2(1.7, 9.2) + t * 0.83),
                   vnoise2(p * 2.50 + 1.87 * wq + vec2(8.3, 2.8) - t * 0.74));
    v = vnoise2(p * 2.50 + 2.21 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.73);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.33 + time * 0.07, vec3(0.45, 0.51, 0.59), vec3(0.37, 0.31, 0.37), vec3(0.73, 0.75, 0.89), vec3(0.51, 0.27, 0.82));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
