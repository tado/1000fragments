uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.97 + t * 1.39 + ph) * 0.7;
    float wb = sin(p.y * 16.81 - t * 1.24 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.53;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.49) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 1.45 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.32;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.92);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.75 + time * 0.27, vec3(0.55, 0.57, 0.56), vec3(0.37, 0.35, 0.31), vec3(0.80, 1.12, 1.26), vec3(0.45, 0.11, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
