uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.10) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 3.73 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -3.18 + time * 0.29) * p;
	p += vec2(0.92, -0.31) * sin(length(p) * 5.70 - time * 0.61) * 0.35;
	p = rot2(0.72) * p;
	p = rot2(time * -0.38) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.09, vec3(0.58, 0.51, 0.57), vec3(0.48, 0.47, 0.37), vec3(0.92, 0.95, 1.05), vec3(0.33, 0.65, 0.88));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
