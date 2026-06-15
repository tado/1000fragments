uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.80) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 2.78 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -1.97 + time * 0.74) * p;
	p = fract(p * 1.06) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.82 + time * 0.05, vec3(0.43, 0.48, 0.45), vec3(0.48, 0.47, 0.37), vec3(1.03, 1.37, 1.36), vec3(0.08, 0.80, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
