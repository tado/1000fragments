uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.10 + t * 3.08 + ph) * 0.7;
    float wb = sin(p.y * 17.48 - t * 3.40 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.60;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.43;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.24) * p * 12.01;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = palette(d * 0.58 + time * 0.07, vec3(0.55, 0.53, 0.45), vec3(0.48, 0.41, 0.39), vec3(1.02, 1.20, 0.90), vec3(0.41, 0.45, 0.58)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
