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
        vec2 im = vec2(sin(t * 0.59 + jf * 4.0), cos(t * 0.33 * jf)) * 0.87;
        xs += sin(length(p - im) * 89.75 - t * 8.71 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.98 - t * 6.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	p = rot2(p.y * -3.92 + time * 0.92) * p;
	p = rot2(1.57) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.56);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.99 + time * 0.27, vec3(0.45, 0.40, 0.58), vec3(0.33, 0.31, 0.31), vec3(1.21, 1.26, 1.37), vec3(0.40, 0.82, 0.04));
	col = mod(col * 2.05, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
