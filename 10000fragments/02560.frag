uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.76) - 0.5;
    float rad = 0.20 + 0.12 * sin(t * 3.84 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.47 + sr * 12.98 - t * 2.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.99;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.36; p = rot2(2.43) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.92);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.44 + time * 0.08, vec3(0.56, 0.43, 0.47), vec3(0.48, 0.34, 0.34), vec3(0.93, 1.15, 0.92), vec3(0.45, 0.88, 0.69));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
