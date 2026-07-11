uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.46) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 1.61 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.89;
	p *= 2.39;
	p = rot2(time * -1.10) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.03, vec3(0.43, 0.42, 0.49), vec3(0.31, 0.49, 0.47), vec3(1.07, 0.75, 0.72), vec3(0.36, 0.89, 0.55));
	col = mod(col * 2.17, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
