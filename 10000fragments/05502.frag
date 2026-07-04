uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.41 + t * 4.06 + ph) + sin(p.y * 12.29 - t * 4.06 + ph)
        + sin((p.x + p.y) * 11.90 + t * 4.06 + ph) + sin(length(p) * 10.22 - t * 4.06 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 28.19 - t * 7.30 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 19.37 - t * 1.86 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.90;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.52);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.62 + time * 0.18, vec3(0.44, 0.40, 0.44), vec3(0.37, 0.43, 0.38), vec3(0.88, 0.91, 0.81), vec3(0.14, 0.86, 0.31));
	col = mod(col * 2.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
