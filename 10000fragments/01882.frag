uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.58 + 0.29 * cos(sa * 6 + t * 2.55 + ph);
    v = sin((sr - petal) * 11.20);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.84) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 2.94 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.20);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.93 + time * 0.10, vec3(0.43, 0.54, 0.50), vec3(0.49, 0.33, 0.49), vec3(0.95, 1.14, 1.14), vec3(0.96, 0.33, 0.73));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
