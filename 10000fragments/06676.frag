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
        vec2 im = vec2(sin(t * 0.34 + jf * 4.0), cos(t * 0.51 * jf)) * 0.32;
        xs += sin(length(p - im) * 168.28 - t * 7.26 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 2.62 + time * 1.20) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.22, vec3(0.57, 0.50, 0.46), vec3(0.35, 0.49, 0.44), vec3(0.75, 0.70, 0.88), vec3(0.07, 0.86, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
