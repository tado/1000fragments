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
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.88 + jf * 4.0), cos(t * 0.36 * jf)) * 0.90;
        xs += sin(length(p - im) * 152.65 - t * 6.89 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.41 * sin(mf + 3.0) + ph), cos(t * 2.41 * cos(mf + 3.0) + ph));
        ms += 0.054 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 1.95 + time * 0.97) * p;
	p = rot2(0.97) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.79);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.72 + time * 0.16, vec3(0.52, 0.41, 0.53), vec3(0.35, 0.36, 0.41), vec3(0.84, 1.25, 0.91), vec3(0.66, 0.04, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
