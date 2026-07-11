uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.12;
    v = 0.5 * (sin(6.0 * cp.x + t * 1.27) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 1.56) * sin(6.0 * cp.y + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.61 + sin(p.y * 2.58 + t * 4.17) * 4.95 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.51;
	{ float fr = length(p); p *= 1.0 + -0.65 * fr * fr; }
	p = (floor(p * 23.5) + 0.5) / 23.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.91);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.18 + time * 0.21, vec3(0.43, 0.46, 0.57), vec3(0.39, 0.38, 0.39), vec3(1.01, 1.00, 1.30), vec3(0.88, 0.61, 0.77));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
