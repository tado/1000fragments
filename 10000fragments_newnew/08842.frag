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
    v = 0.5 * (sin(p.x * 17.24 + t * 3.89 + ph) + sin(p.y * 16.81 - t * 3.58 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.22 * vnoise2(p * 4.38 + t * 1.22);
    v = sin(wr * 21.06 - t * 0.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.53);
	float d = d1 * d2;
	vec3 col = palette(d * 0.90 + time * 0.27, vec3(0.42, 0.49, 0.45), vec3(0.32, 0.33, 0.31), vec3(1.09, 0.72, 0.99), vec3(0.67, 0.32, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
