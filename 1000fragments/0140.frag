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
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.64 + jf * 4.0), cos(t * 0.33 * jf)) * 0.84;
        xs += sin(length(p - im) * 67.65 - t * 4.15 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	p = rot2(time * 1.19) * p;
	p = fract(p * 2.14) - 0.5;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.03, vec3(0.42, 0.49, 0.44), vec3(0.34, 0.39, 0.33), vec3(1.35, 0.93, 1.03), vec3(0.01, 0.43, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
