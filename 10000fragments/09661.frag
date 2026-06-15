uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.79 + jf * 4.0), cos(t * 0.31 * jf)) * 0.50;
        xs += sin(length(p - im) * 145.33 - t * 9.25 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.64 + t * 1.69 + ph) + sin(p.y * 2.13 - t * 5.38 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(1.20) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.54);
	float d = d1 + d2;
	vec3 col = palette(d * 1.57 + time * 0.06, vec3(0.51, 0.50, 0.60), vec3(0.39, 0.44, 0.35), vec3(0.98, 1.17, 1.01), vec3(0.39, 0.43, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
