uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.70 + 0.21 * cos(sa * 9.0 + t * 0.68 + ph);
    v = sin((sr - petal) * 12.56);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.25;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.22 + 0.15 * sin(t * 2.69 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.26);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.42 + time * 0.29, vec3(0.60, 0.52, 0.46), vec3(0.45, 0.46, 0.36), vec3(1.02, 1.22, 1.04), vec3(0.18, 0.45, 0.77));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
