uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.38) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 0.84 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.84;
	p *= 2.28;
	p = rot2(time * -0.65) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.25, vec3(0.44, 0.51, 0.56), vec3(0.40, 0.34, 0.38), vec3(1.23, 1.28, 1.25), vec3(0.99, 0.71, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
