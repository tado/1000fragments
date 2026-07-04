uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.79 + t * 2.57 + ph) * 0.7;
    float wb = sin(p.y * 11.57 - t * 3.21 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.70;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.22) * p * 16.39;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 1.48 + time * 0.25, vec3(0.42, 0.42, 0.57), vec3(0.43, 0.41, 0.38), vec3(1.28, 1.06, 0.96), vec3(0.08, 0.11, 0.65)) * v;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
