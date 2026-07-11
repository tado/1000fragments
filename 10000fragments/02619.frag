uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.20 * cos(sa * 6 + t * 0.64 + ph);
    v = sin((sr - petal) * 16.03);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.09) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 2.51 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	{ p = vec2(atan(p.y, p.x) * 2.04, length(p) * 5.66 - time * 0.58); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.83);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.56 + time * 0.21, vec3(0.53, 0.59, 0.55), vec3(0.37, 0.41, 0.31), vec3(1.25, 1.18, 1.39), vec3(0.37, 0.65, 0.98));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
