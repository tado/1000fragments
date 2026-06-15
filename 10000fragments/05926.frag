uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 36.56 - t * 2.59 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 20.00 - t * 2.59 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.99 + t * 4.01 + ph) + sin(p.y * 7.02 - t * 4.01 + ph)
        + sin((p.x + p.y) * 9.06 + t * 4.01 + ph) + sin(length(p) * 9.33 - t * 4.01 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.31);
	float d = d1 + d2;
	vec3 col = palette(d * 1.00 + time * 0.10, vec3(0.41, 0.48, 0.44), vec3(0.31, 0.41, 0.30), vec3(1.04, 1.04, 0.84), vec3(0.84, 0.52, 0.17));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
