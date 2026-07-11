uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.35) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 2.56 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.95 + t * 3.63 + ph) + sin(p.y * 6.14 - t * 4.97 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.65;
	p = rot2(time * 1.12) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.12);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.41 + time * 0.27, vec3(0.45, 0.49, 0.42), vec3(0.48, 0.35, 0.32), vec3(1.26, 1.34, 0.76), vec3(0.53, 0.43, 0.31));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
