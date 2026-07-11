uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.35 + t * 1.09 + ph) * 0.7;
    float wb = sin(p.y * 4.72 - t * 1.16 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.32;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.06) * p * 11.12;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.60;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 1.19 + time * 0.07, vec3(0.55, 0.55, 0.51), vec3(0.33, 0.32, 0.30), vec3(0.97, 0.86, 1.21), vec3(0.90, 0.09, 0.62)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
