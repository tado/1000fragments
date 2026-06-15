uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.71 + sin(p.y * 4.26 + t * 1.28) * 3.11 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.61) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 3.73 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.33) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.16);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.51 + time * 0.14, vec3(0.52, 0.57, 0.41), vec3(0.35, 0.40, 0.41), vec3(1.37, 0.88, 1.35), vec3(0.02, 0.26, 0.97));
	col = mod(col * 2.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
