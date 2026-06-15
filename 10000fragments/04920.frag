uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.47 + jf * 4.0), cos(t * 0.20 * jf)) * 0.84;
        xs += sin(length(p - im) * 186.29 - t * 8.93 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.94, t * 1.43 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	p += vec2(-0.80, -0.88) * sin(length(p) * 5.46 - time * 0.51) * 0.23;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.12);
	float d = d1 * d2;
	vec3 col = palette(d * 1.48 + time * 0.22, vec3(0.45, 0.46, 0.52), vec3(0.32, 0.41, 0.36), vec3(0.92, 1.03, 0.70), vec3(0.86, 0.35, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
