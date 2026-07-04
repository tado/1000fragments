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
    float bx = p.x + (vnoise2(vec2(p.y * 1.73, t * 1.22)) - 0.5) * 1.19;
    v = exp(-abs(bx) * 7.84) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.63 + t * 0.92) - 0.5) * 2.0;
    v = sin((p.y * 6.58 + zx * 1.29 + t * 1.85) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.78);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.72 + time * 0.00, vec3(0.55, 0.58, 0.46), vec3(0.43, 0.39, 0.32), vec3(1.07, 0.84, 0.97), vec3(0.18, 0.25, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
