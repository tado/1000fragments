uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.20, t * 1.53 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.03) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 2.46 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	p = rot2(2.05) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.53);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.12 + time * 0.23, vec3(0.58, 0.58, 0.40), vec3(0.44, 0.45, 0.37), vec3(1.08, 0.94, 1.04), vec3(0.86, 0.57, 0.30));
	col = fract(col * 1.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
