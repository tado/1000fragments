uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.24 + t * 2.01 + ph) + sin(p.y * 9.87 - t * 2.01 + ph)
        + sin((p.x + p.y) * 11.61 + t * 2.01 + ph) + sin(length(p) * 17.14 - t * 2.01 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 26.63 - t * 1.97 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 33.02 - t * 1.97 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.59);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.55 + time * 0.05, vec3(0.54, 0.53, 0.41), vec3(0.46, 0.39, 0.46), vec3(0.76, 1.01, 0.87), vec3(0.40, 0.77, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
