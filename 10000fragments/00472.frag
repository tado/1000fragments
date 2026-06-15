uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 32.17 - t * 2.98 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 31.03 - t * 2.98 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.47 + vec2(t * 1.97, -t * 1.97) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.09);
	float d = d1 * d2;
	vec3 col = palette(d * 1.04 + time * 0.28, vec3(0.48, 0.46, 0.51), vec3(0.43, 0.38, 0.48), vec3(1.20, 0.91, 1.28), vec3(0.10, 0.83, 0.97));
	col = clamp((col - 0.5) * 1.55 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
