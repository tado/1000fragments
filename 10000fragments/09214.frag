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
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.13 + jf * 4.0), cos(t * 0.53 * jf)) * 0.51;
        xs += sin(length(p - im) * 86.65 - t * 6.95 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.14 + jf * 4.0), cos(t * 0.21 * jf)) * 0.53;
        xs += sin(length(p - im) * 190.90 - t * 5.11 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 1.86 + time * 0.54) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.78);
	float d = d1 * d2;
	vec3 col = palette(d * 1.30 + time * 0.01, vec3(0.40, 0.53, 0.44), vec3(0.36, 0.43, 0.47), vec3(1.08, 1.36, 1.16), vec3(0.21, 0.71, 0.71));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
