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
        vec2 im = vec2(sin(t * 0.12 + jf * 4.0), cos(t * 0.26 * jf)) * 0.43;
        xs += sin(length(p - im) * 184.07 - t * 10.81 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.55;
	{ p = vec2(atan(p.y, p.x) * 1.41, length(p) * 3.40 - time * 0.46); }
	p = rot2(length(p) * -2.68 + time * 0.53) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.09, vec3(0.56, 0.51, 0.59), vec3(0.47, 0.49, 0.42), vec3(1.04, 0.72, 0.85), vec3(0.20, 0.29, 1.00));
	col = fract(col * 1.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
