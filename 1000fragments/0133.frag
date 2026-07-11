uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.13 + sin(p.y * 3.30 + t * 5.02) * 2.49 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.34 + vec2(t * 1.89, -t * 1.89) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.89);
	float d = d1 + d2;
	vec3 col = palette(d * 1.45 + time * 0.19, vec3(0.41, 0.48, 0.41), vec3(0.44, 0.32, 0.39), vec3(1.30, 0.96, 0.81), vec3(0.83, 0.57, 0.74));
	col = mod(col * 2.13, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
