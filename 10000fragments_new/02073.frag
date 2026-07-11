uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.92 + jf * 4.0), cos(t * 0.14 * jf)) * 0.48;
        xs += sin(length(p - im) * 155.45 - t * 8.49 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.12) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 3.90 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(time * -0.34) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.82);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.57 + time * 0.27, vec3(0.43, 0.46, 0.44), vec3(0.37, 0.46, 0.42), vec3(0.92, 1.05, 1.06), vec3(0.73, 0.75, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
