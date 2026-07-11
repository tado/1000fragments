uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.90 + vec2(t * 0.38, -t * 0.38) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.26) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 0.96 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.62);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.78 + time * 0.19, vec3(0.56, 0.49, 0.59), vec3(0.33, 0.33, 0.41), vec3(1.37, 1.25, 1.24), vec3(0.98, 0.66, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
