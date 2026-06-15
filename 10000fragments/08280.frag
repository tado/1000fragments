uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.00 + t * 2.34 + ph) + sin(p.y * 8.09 - t * 5.23 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.47) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 1.62 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	p = rot2(time * 1.13) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.75);
	float d = d1 * d2;
	vec3 col = palette(d * 1.64 + time * 0.23, vec3(0.48, 0.50, 0.53), vec3(0.31, 0.38, 0.33), vec3(0.89, 1.08, 1.05), vec3(0.80, 0.25, 0.97));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
