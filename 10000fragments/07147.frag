uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.11 + sin(p.y * 2.24 + t * 3.20) * 4.93 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.86 + vec2(t * 1.77, -t * 1.77) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.25);
	float d = d1 + d2;
	vec3 col = palette(d * 1.44 + time * 0.07, vec3(0.44, 0.49, 0.42), vec3(0.41, 0.46, 0.37), vec3(0.96, 0.93, 0.78), vec3(0.95, 0.40, 0.85));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
