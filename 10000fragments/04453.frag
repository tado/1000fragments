uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.79) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 3.96 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 17.06 - t * 2.68 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 38.84 - t * 2.68 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.61) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.68);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.17 + time * 0.04, vec3(0.43, 0.55, 0.50), vec3(0.48, 0.50, 0.30), vec3(0.81, 0.82, 1.08), vec3(0.20, 0.18, 0.18));
	col = fract(col * 2.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
