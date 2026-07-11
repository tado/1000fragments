uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.61 + t * 1.97 + ph) * 0.7;
    float wb = sin(p.y * 12.87 - t * 3.78 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.77;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.40) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 1.34 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -3.47 + time * 1.00) * p;
	{ p = vec2(atan(p.y, p.x) * 2.38, length(p) * 5.26 - time * 0.80); }
	p.y += sin(p.x * 6.52 + time * 2.61) * 0.25;
	p = rot2(1.57) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.50);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.99 + time * 0.21, vec3(0.45, 0.54, 0.48), vec3(0.49, 0.46, 0.44), vec3(1.33, 1.31, 1.35), vec3(0.15, 0.97, 0.44));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
