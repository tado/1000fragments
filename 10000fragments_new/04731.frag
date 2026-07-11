uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.12 + t * 2.59 + ph) * 0.7;
    float wb = sin(p.y * 15.57 - t * 0.52 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.29;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.79 + sin(p.y * 3.87 + t * 4.70) * 1.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.06;
	p = abs(p) - 0.46;
	{ float fr = length(p); p *= 1.0 + 0.27 * fr * fr; }
	p = fract(p * 2.60) - 0.5;
	p = (floor(p * 15.3) + 0.5) / 15.3;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.22);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.45 + time * 0.07, vec3(0.47, 0.57, 0.48), vec3(0.34, 0.41, 0.45), vec3(0.93, 0.83, 0.80), vec3(0.55, 0.57, 0.46));
	col = clamp((col - 0.5) * 1.35 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
