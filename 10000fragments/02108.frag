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
    float wr = length(p) + 0.29 * vnoise2(p * 3.19 + t * 1.31);
    v = sin(wr * 23.26 - t * 2.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.42;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.25, vec3(0.45, 0.56, 0.53), vec3(0.31, 0.42, 0.31), vec3(1.32, 1.02, 1.16), vec3(0.06, 0.71, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
