uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.60) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 1.81 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.38 + sr * 18.13 - t * 3.98 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.40) * p;
	p += vec2(-0.89, -0.84) * sin(length(p) * 3.50 - time * 1.00) * 0.37;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = d1 + d2;
	vec3 col = palette(d * 1.14 + time * 0.03, vec3(0.48, 0.53, 0.46), vec3(0.46, 0.47, 0.41), vec3(1.15, 0.91, 1.23), vec3(0.08, 0.85, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
