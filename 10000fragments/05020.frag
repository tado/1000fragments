uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
    vec2 z = p * 1.28; vec2 jc = vec2(-0.00 + 0.3 * sin(t * 1.25 + ph), 0.32 + 0.3 * cos(t * 0.42 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 20.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.11 * vnoise2(p * 4.42 + t * 1.47);
    v = sin(wr * 20.16 - t * 0.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	p = rot2(p.y * 2.21 + time * 0.69) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.38));
	p = rot2(length(p) * -1.51 + time * 0.63) * p;
	p *= 1.0 + 0.39 * sin(time * 3.27);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.41);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.75 + time * 0.04, vec3(0.48, 0.51, 0.51), vec3(0.37, 0.33, 0.39), vec3(1.40, 1.27, 0.91), vec3(0.81, 0.63, 0.40));
	col = clamp((col - 0.5) * 1.32 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
