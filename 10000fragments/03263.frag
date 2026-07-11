uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.20) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 1.90 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.25 - t * 1.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.10) * p;
	p = fract(p * 1.64) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.58);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.36 + time * 0.19, vec3(0.52, 0.59, 0.41), vec3(0.40, 0.40, 0.36), vec3(1.13, 0.88, 0.99), vec3(0.91, 0.46, 0.04));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
