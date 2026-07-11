uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.09 + vec2(t * 1.49, -t * 1.49) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.42 + t * 1.48 + ph) + sin(p.y * 14.70 - t * 1.00 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.67;
	{ float fr = length(p); p *= 1.0 + 0.28 * fr * fr; }
	p = rot2(time * 0.66) * p;
	p *= 2.30;
	p += vec2(-0.85, 0.67) * sin(length(p) * 4.35 - time * 0.94) * 0.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.13);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.66 + time * 0.09, vec3(0.41, 0.43, 0.54), vec3(0.33, 0.48, 0.43), vec3(1.11, 1.01, 1.07), vec3(0.45, 0.55, 0.51));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
