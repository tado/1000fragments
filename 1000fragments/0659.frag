uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.08 + sin(p.y * 3.02 + t * 5.90) * 2.60 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.70 + vec2(t * 2.69, -t * 2.69) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.96);
	float d = d1 + d2;
	vec3 col = palette(d * 1.11 + time * 0.03, vec3(0.52, 0.45, 0.46), vec3(0.46, 0.45, 0.37), vec3(0.89, 0.90, 1.00), vec3(0.85, 0.76, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
