uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.46 - t * 5.02 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.90) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 2.16 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.60, -0.26) * sin(length(p) * 5.04 - time * 1.79) * 0.38;
	p = rot2(time * 1.34) * p;
	p = abs(p) - 0.62;
	{ float fr = length(p); p *= 1.0 + 0.71 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.30);
	float d = d1 * d2;
	vec3 col = palette(d * 1.69 + time * 0.24, vec3(0.49, 0.54, 0.47), vec3(0.45, 0.44, 0.46), vec3(0.74, 1.02, 1.34), vec3(0.44, 0.91, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
