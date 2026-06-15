uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 10.07 - t * 7.34 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 30.21 - t * 7.34 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.90 + t * 3.82 + ph) + sin(p.y * 5.59 - t * 3.82 + ph)
        + sin((p.x + p.y) * 7.05 + t * 3.82 + ph) + sin(length(p) * 7.24 - t * 3.82 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.25);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.60 + time * 0.17, vec3(0.55, 0.41, 0.45), vec3(0.40, 0.43, 0.31), vec3(0.93, 1.39, 0.75), vec3(0.47, 0.65, 0.34));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
