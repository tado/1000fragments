uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.87) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 1.47 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.01;
	p = rot2(p.y * -2.85 + time * 0.39) * p;
	{ float fr = length(p); p *= 1.0 + -0.67 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.84 + time * 0.01, vec3(0.41, 0.47, 0.57), vec3(0.44, 0.42, 0.33), vec3(1.00, 1.14, 0.77), vec3(0.45, 0.93, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
