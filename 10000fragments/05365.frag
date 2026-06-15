uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.34 + t * 5.67 + ph) + sin(p.y * 5.06 - t * 5.42 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.72 - t * 3.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.39;
	{ float fr = length(p); p *= 1.0 + 0.47 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.46);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.49 + time * 0.30, vec3(0.44, 0.52, 0.56), vec3(0.35, 0.31, 0.49), vec3(0.92, 0.93, 1.31), vec3(0.83, 0.85, 0.22));
	col = fract(col * 2.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
