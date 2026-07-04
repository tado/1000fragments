uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.97) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 0.74 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.25 + sr * 20.96 - t * 1.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.54; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.86);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.90 + time * 0.10, vec3(0.57, 0.54, 0.54), vec3(0.47, 0.32, 0.44), vec3(1.28, 1.00, 1.29), vec3(0.38, 0.90, 0.79));
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
