uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.66 + 0.18 * cos(sa * 5 + t * 2.93 + ph);
    v = sin((sr - petal) * 13.27);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.85) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 0.72 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.19) - 0.5;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.37);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.14 + time * 0.23, vec3(0.44, 0.42, 0.54), vec3(0.36, 0.41, 0.39), vec3(1.20, 1.35, 1.26), vec3(0.40, 0.77, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
