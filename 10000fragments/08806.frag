uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.50) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 0.50 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	p = rot2(time * 0.63) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.21, vec3(0.48, 0.59, 0.56), vec3(0.30, 0.34, 0.33), vec3(0.73, 1.17, 0.80), vec3(0.92, 0.33, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
