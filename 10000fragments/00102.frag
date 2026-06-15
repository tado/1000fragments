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
    float rad = 0.37 + 0.12 * sin(t * 3.56 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.65;
	{ float fr = length(p); p *= 1.0 + -0.49 * fr * fr; }
	p = rot2(length(p) * -3.00 + time * 0.80) * p;
	p = fract(p * 1.15) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.06, vec3(0.41, 0.47, 0.52), vec3(0.43, 0.35, 0.41), vec3(0.72, 0.88, 1.07), vec3(0.96, 0.08, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
