uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.84) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 3.90 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.93;
	p = rot2(length(p) * -3.48 + time * 0.70) * p;
	p *= 3.29;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.98 + time * 0.15, vec3(0.45, 0.51, 0.50), vec3(0.30, 0.32, 0.49), vec3(1.00, 1.35, 1.04), vec3(0.20, 0.75, 0.21));
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
