uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.98) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 2.67 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.12 + vec2(t * 1.72, -t * 1.72) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.35;
	p = fract(p * 1.80) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.17);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.01 + time * 0.26, vec3(0.56, 0.46, 0.56), vec3(0.36, 0.37, 0.42), vec3(1.01, 0.87, 1.25), vec3(0.70, 0.67, 0.79));
	col = mod(col * 1.42, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
