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
        vec2 im = vec2(sin(t * 0.36 + jf * 4.0), cos(t * 0.48 * jf)) * 0.62;
        xs += sin(length(p - im) * 208.82 - t * 10.23 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2(length(p) * 3.75 + time * 0.86) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.09, vec3(0.60, 0.55, 0.59), vec3(0.40, 0.47, 0.42), vec3(1.24, 1.23, 1.02), vec3(0.53, 0.61, 0.71));
	col = mod(col * 1.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
