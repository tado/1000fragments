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
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.73 + jf * 4.0), cos(t * 0.27 * jf)) * 0.75;
        xs += sin(length(p - im) * 142.47 - t * 11.44 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.84 + vec2(t * 2.77, -t * 2.77) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.71, -0.35) * sin(length(p) * 4.29 - time * 1.15) * 0.34;
	p = rot2(length(p) * 1.32 + time * 1.17) * p;
	p = rot2(1.38) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.33);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.42 + time * 0.24, vec3(0.53, 0.47, 0.58), vec3(0.48, 0.42, 0.31), vec3(1.03, 1.16, 1.01), vec3(0.26, 0.31, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
