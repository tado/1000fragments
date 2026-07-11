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
        vec2 im = vec2(sin(t * 0.44 + jf * 4.0), cos(t * 0.23 * jf)) * 0.35;
        xs += sin(length(p - im) * 74.37 - t * 4.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.35 * sin(mf + 3.0) + ph), cos(t * 1.35 * cos(mf + 3.0) + ph));
        ms += 0.039 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(1.69) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.67);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.92 + time * 0.01, vec3(0.52, 0.43, 0.55), vec3(0.40, 0.49, 0.45), vec3(1.30, 0.73, 1.24), vec3(0.68, 0.86, 0.08));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
