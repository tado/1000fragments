uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.86 + t * 1.38) - 0.5) * 2.0;
    v = sin((p.y * 2.41 + zx * 1.17 + t * 1.27) * 3.1415927 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.15 + sin(p.y * 5.80 + t * 2.94) * 3.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.88;
	{ float fr = length(p); p *= 1.0 + 0.35 * fr * fr; }
	p *= 1.0 + 0.11 * sin(time * 4.86);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.48);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.17 + time * 0.23, vec3(0.48, 0.51, 0.51), vec3(0.44, 0.39, 0.46), vec3(1.13, 1.18, 1.35), vec3(0.03, 0.20, 0.95));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
