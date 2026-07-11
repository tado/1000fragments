uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.30) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 2.42 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 2.13 + time * 1.05) * p;
	p += vec2(0.70, 0.20) * sin(length(p) * 3.57 - time * 1.28) * 0.23;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.23, vec3(0.54, 0.42, 0.55), vec3(0.30, 0.42, 0.39), vec3(1.25, 0.92, 1.39), vec3(0.38, 0.14, 0.97));
	col = mod(col * 2.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
