uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.51 + sr * 22.38 - t * 2.67 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.84) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 2.28 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.02;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.41, lr * 1.20 + time * -0.27); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.01);
	float d = d1 * d2;
	vec3 col = palette(d * 0.52 + time * 0.06, vec3(0.41, 0.60, 0.49), vec3(0.49, 0.34, 0.43), vec3(0.75, 1.25, 0.99), vec3(0.60, 0.59, 0.49));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
