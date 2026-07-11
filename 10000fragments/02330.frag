uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.11 * cos(sa * 8 + t * 0.31 + ph);
    v = sin((sr - petal) * 7.76);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.87) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 3.01 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.21) * p;
	p = rot2(p.y * 1.38 + time * 0.91) * p;
	p *= 2.55;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.50);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.67 + time * 0.00, vec3(0.49, 0.45, 0.56), vec3(0.35, 0.40, 0.31), vec3(0.80, 1.38, 0.99), vec3(0.73, 0.21, 0.25));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
