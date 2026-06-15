uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.76 + sin(p.y * 3.26 + t * 1.41) * 2.15 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.82) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 2.81 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	p = rot2(time * 0.77) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.70);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.38 + time * 0.16, vec3(0.59, 0.42, 0.53), vec3(0.36, 0.40, 0.36), vec3(1.08, 0.87, 1.07), vec3(0.03, 0.91, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
