uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 24.64 - t * 3.63 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 16.62 - t * 3.63 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.12 + t * 4.72 + ph) + sin(p.y * 4.78 - t * 4.72 + ph)
        + sin((p.x + p.y) * 6.25 + t * 4.72 + ph) + sin(length(p) * 4.79 - t * 4.72 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.90);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.83 + time * 0.11, vec3(0.57, 0.55, 0.44), vec3(0.32, 0.49, 0.40), vec3(0.78, 0.92, 0.93), vec3(0.32, 0.59, 0.77));
	col = mod(col * 2.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
