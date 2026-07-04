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
    v = 0.5 * (sin(p.x * 6.12 + t * 4.41 + ph) + sin(p.y * 14.48 - t * 5.55 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 2.75, t * 2.98)) - 0.5) * 1.39;
    v = exp(-abs(bx) * 8.18) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.42);
	float d = d1 + d2;
	vec3 col = palette(d * 0.96 + time * 0.09, vec3(0.45, 0.48, 0.46), vec3(0.32, 0.44, 0.30), vec3(1.05, 1.11, 1.15), vec3(0.17, 0.46, 0.05));
	col *= 0.82 + 0.12 * sin(gl_FragCoord.y * 2.10 + time * 12.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
