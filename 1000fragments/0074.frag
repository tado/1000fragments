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
    float zx = abs(fract(p.x * 3.65 + t * 0.62) - 0.5) * 2.0;
    v = sin((p.y * 7.52 + zx * 1.46 + t * 2.39) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.31 * vnoise2(p * 3.94 + t * 0.90);
    v = sin(wr * 11.49 - t * 3.83 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 2.18));
	q2 = sin(q2 * 2.62 + time * 0.87) * 1.18;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.95);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.75));
	vec3 col = palette(d * 1.47 + time * 0.25, vec3(0.54, 0.44, 0.44), vec3(0.33, 0.40, 0.44), vec3(1.25, 1.13, 0.72), vec3(0.87, 0.79, 0.83));
	col *= 0.80 + 0.19 * sin(gl_FragCoord.y * 1.96 + time * 5.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
