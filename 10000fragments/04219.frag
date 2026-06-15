uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.16 + t * 4.04 + ph) + sin(p.y * 2.25 - t * 1.45 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.93 + jf * 4.0), cos(t * 0.51 * jf)) * 0.91;
        xs += sin(length(p - im) * 114.62 - t * 5.44 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.17;
	p = rot2(p.y * -2.52 + time * 0.62) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.29);
	float d = d1 + d2;
	vec3 col = palette(d * 0.63 + time * 0.11, vec3(0.46, 0.59, 0.58), vec3(0.48, 0.43, 0.32), vec3(1.27, 0.85, 0.70), vec3(0.57, 0.35, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
