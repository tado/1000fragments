uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.01) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 2.55 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	p = rot2(2.70) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.64 + time * 0.08, vec3(0.43, 0.43, 0.49), vec3(0.40, 0.34, 0.47), vec3(1.34, 1.13, 1.38), vec3(0.97, 0.00, 0.85));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
