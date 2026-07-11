uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.81) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 2.95 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.40 + 0.26 * pow(abs(cos(ra * 6.0 + t * 1.51)), 1.02);
    v = sin((rr - pet) * 19.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.05);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.77 + time * 0.18, vec3(0.56, 0.59, 0.48), vec3(0.45, 0.33, 0.33), vec3(1.28, 0.90, 0.78), vec3(0.07, 0.13, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
