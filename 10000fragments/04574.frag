uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.11) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 3.47 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.40 + vec2(t * 0.90, -t * 0.90) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	{ p = vec2(atan(p.y, p.x) * 2.67, length(p) * 2.99 - time * 0.30); }
	{ float fr = length(p); p *= 1.0 + 0.32 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.74);
	float d = d1 * d2;
	vec3 col = palette(d * 1.51 + time * 0.05, vec3(0.58, 0.57, 0.46), vec3(0.41, 0.44, 0.34), vec3(1.11, 1.07, 0.75), vec3(0.31, 0.88, 0.01));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
