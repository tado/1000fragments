uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.05) - 0.5;
    float rad = 0.20 + 0.12 * sin(t * 0.63 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.17 + jf * 4.0), cos(t * 0.36 * jf)) * 0.65;
        xs += sin(length(p - im) * 150.92 - t * 13.11 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.44;
	p *= 2.28;
	p = rot2(length(p) * 2.17 + time * 0.85) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.81);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.57 + time * 0.29, vec3(0.45, 0.40, 0.56), vec3(0.36, 0.47, 0.32), vec3(0.92, 0.93, 0.82), vec3(0.47, 0.31, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
