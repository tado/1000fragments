uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.65) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 0.70 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	p = fract(p * 2.76) - 0.5;
	p = rot2(length(p) * 2.67 + time * 1.31) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.15, vec3(0.55, 0.56, 0.52), vec3(0.38, 0.42, 0.30), vec3(0.92, 0.79, 0.74), vec3(0.61, 0.09, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
