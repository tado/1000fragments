uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.23) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 0.59 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.16 + sin(p.y * 5.90 + t * 5.31) * 4.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.73) - 0.5;
	p = rot2(length(p) * 2.55 + time * 0.34) * p;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.47);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.12 + time * 0.08, vec3(0.53, 0.45, 0.50), vec3(0.37, 0.35, 0.42), vec3(1.21, 1.08, 0.76), vec3(0.04, 0.81, 0.43));
	col = mod(col * 1.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
