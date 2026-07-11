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
    vec2 wq = vec2(vnoise2(p * 1.63 + ph), vnoise2(p * 1.63 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.63 + 3.28 * wq + vec2(1.7, 9.2) + t * 1.18),
                   vnoise2(p * 1.63 + 2.73 * wq + vec2(8.3, 2.8) - t * 0.75));
    v = vnoise2(p * 1.63 + 3.09 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.07) * p * 14.57;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 1.00 + time * 0.21, vec3(0.55, 0.41, 0.43), vec3(0.39, 0.31, 0.43), vec3(0.73, 1.32, 0.95), vec3(0.71, 0.63, 0.97)) * v;
	col *= 0.82 + 0.14 * sin(gl_FragCoord.y * 2.44 + time * 8.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
