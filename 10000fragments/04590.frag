uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.12 + t * 3.08 + ph) + sin(p.y * 3.96 - t * 3.08 + ph)
        + sin((p.x + p.y) * 2.56 + t * 3.08 + ph) + sin(length(p) * 9.54 - t * 3.08 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 11.81 - t * 6.64 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 27.20 - t * 6.64 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.76);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.65 + time * 0.25, vec3(0.45, 0.46, 0.59), vec3(0.38, 0.41, 0.38), vec3(1.25, 0.73, 0.97), vec3(0.25, 0.51, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
